var assert = require('assert');
var NonogramSolver = require('./nonogram-solver');
var Cell = require('./cell.js');

/**
 * npm install -g mocha && mocha nonogram-solver.spec.js
 */

describe('NonogramSolver', function () {
  var nonogramSolver;

  beforeEach(function () {
    nonogramSolver = new NonogramSolver();
  });

  describe('findAllSpaceDistributions', function () {
    it('should find 0 spaces, 1 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(0, 1), [[0]]);
    });
    it('should find 0 spaces, 3 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(0, 3), [[0, 0, 0]]);
    });
    it('should find 1 space, 1 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(1, 1), [[1]]);
    });

    it('should find 2 spaces, 1 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(2, 1), [[2]]);
    });

    it('should find 2 spaces, 2 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(2, 2), [[0, 2], [1, 1], [2, 0]]);
    });

    it('should find 1 spaces, 3 bin', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSpaceDistributions(1, 3), [[0, 0, 1], [0, 1, 0], [1, 0, 0]]);
    });
  });

  describe('createSolution()', function () {
    it('should create a solution for [1,3,4] and [2,2,2,2]', function () {
      assert.deepStrictEqual(nonogramSolver.createSolution([1, 3, 4], [2, 2, 2, 2]),
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0]);
    });
    it('should create a solution for [1,1] and [0,0,0]', function () {
      assert.deepStrictEqual(nonogramSolver.createSolution([1, 1], [0, 0, 0]),
        [1, 0, 1]);
    });
  });

  describe('findAllSolutions()', function () {
    it('should find all solutions for 1,1 in 3 cells', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSolutions([1, 1], 3),
        [[1, 0, 1]]);
    });
    it('should find all solutions for 1 in 3 cells', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSolutions([1], 3),
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    });
    it('should find all solutions for 1,2 in 6 cells', function () {
      assert.deepStrictEqual(nonogramSolver.findAllSolutions([1, 2], 6),
        [[1, 0, 1, 1, 0, 0], [1, 0, 0, 1, 1, 0], [1, 0, 0, 0, 1, 1],
          [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 0, 1, 0, 1, 1]]);
    });
  });

  describe('matchCellsWithSolution()', function () {
    it('should, for cells [C(1),C(1),C(1)], not filter out [1,1,0]', function () {
      assert.equal(nonogramSolver.matchCellsWithSolution(
        [new Cell(1), new Cell(1), new Cell(1)],
        [1, 1, 0]
      ), true);
    });

    it('should, for cells [C(1),C(1),C(2)], filter out [1,1,0]', function () {
      assert.equal(nonogramSolver.matchCellsWithSolution(
        [new Cell(1), new Cell(1), new Cell(2)],
        [1, 1, 0]
      ), false);
    });

    it('should, for cells [C(0),C(1),C(1)], filter out [1,1,0]', function () {
      assert.equal(nonogramSolver.matchCellsWithSolution(
        [new Cell(0), new Cell(1), new Cell(1)],
        [1, 1, 0]
      ), false);
    });
  });

  describe('hint()', function () {
    it('should check all three', function () {
      var cells = [new Cell(), new Cell(), new Cell()];
      var hinted = nonogramSolver.hint([3], cells);

      assert.equal(hinted, true);
      assert.equal(cells[0].suggest, true);
      assert.equal(cells[1].suggest, true);
      assert.equal(cells[2].suggest, true);
    });

    it('should check middle for definition [2] and length 3', function () {
      var cells = [new Cell(), new Cell(), new Cell()];
      var hinted = nonogramSolver.hint([2], cells);

      assert.equal(hinted, true);
      assert.equal(cells[0].suggest, false);
      assert.equal(cells[1].suggest, true);
      assert.equal(cells[2].suggest, false);
    });

    it('should check nothing for definition [1] and length 3', function () {
      var cells = [new Cell(), new Cell(), new Cell()];
      var hinted = nonogramSolver.hint([1], cells);

      assert.equal(hinted, false);
      assert.equal(cells[0].suggest, false);
      assert.equal(cells[1].suggest, false);
      assert.equal(cells[2].suggest, false);
    });

    it('should check nothing for definition [3] and length 6', function () {
      var cells = [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      var hinted = nonogramSolver.hint([3], cells);

      assert.equal(hinted, false);
      assert.equal(cells[0].suggest, false);
      assert.equal(cells[1].suggest, false);
      assert.equal(cells[2].suggest, false);
      assert.equal(cells[3].suggest, false);
      assert.equal(cells[4].suggest, false);
      assert.equal(cells[5].suggest, false);
    });

    it('should check only(!) the adjacent for definition [3] and length 6, with first cell checked', function () {
      var cells = [new Cell(2), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()];
      var hinted = nonogramSolver.hint([3], cells);

      assert.equal(hinted, true);
      assert.equal(cells[0].suggest, false);
      assert.equal(cells[1].suggest, true);
      assert.equal(cells[2].suggest, true);
      assert.equal(cells[3].suggest, false);
      assert.equal(cells[4].suggest, false);
      assert.equal(cells[5].suggest, false);
    });

    it('should not suggest checked cells', function () {
      var cells = [new Cell(2), new Cell(2), new Cell()];
      var hinted = nonogramSolver.hint([2], cells);

      assert.equal(hinted, false);
      assert.equal(cells[0].suggest, false);
      assert.equal(cells[1].suggest, false);
      assert.equal(cells[2].suggest, false);
    });

  });

});
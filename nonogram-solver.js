var Cell = require('./cell');

var _ = require('./node_modules/lodash/index');

function NonogramSolver() {
  /**
   * Check of uncheck cells die je met de gegeven cells en definitions kunt doen. Als het lukt, retourneer true.
   *
   * @param {number[]} definition
   * @param {Cell[]} cells
   *
   * @return {boolean} iets (un)checken was mogelijk
   */
  this.solve = function (definition, cells) {
    if (!_.any(cells, 'value', 1)) {
      return false;
    }

    var foundSomeSolution = false;

    var suggestions = this.findSuggestions(definition, cells);

    for (var i = 0; i < suggestions.length; i++) {
      if (cells[i].value === 1 && suggestions[i] === 2) {
        cells[i].value = 2;
        foundSomeSolution = true;
      } else if (cells[i].value === 1 && suggestions[i] === 0) {
        cells[i].value = 0;
        foundSomeSolution = true;
      }
    }

    return foundSomeSolution;
  };

  /**
   * Kijk of je een hint kunt geven voor deze rij/kolom. In dat geval, zet de suggest van de Cell(en) op true,
   * en retourneer true.
   *
   * @param {number[]} definition
   * @param {Cell[]} cells
   *
   * @return {boolean} hint was possible
   */
  this.hint = function (definition, cells) {
    var foundValidSuggestion = false;

    var suggestions = this.findSuggestions(definition, cells);

    for (var i = 0; i < suggestions.length; i++) {
      if (cells[i].value === 1 && suggestions[i] === 2) {
        cells[i].suggest = true;
        foundValidSuggestion = true;
      }
    }

    return foundValidSuggestion;
  };

  this.findSuggestions = function (definition, cells) {
    var allSolutions = this.findAllSolutions(definition, cells.length);

    var possibleSolutions = _.filter(allSolutions, _.partial(this.matchCellsWithSolution, cells));

    var possibleSolutionSum = _.unzipWith(possibleSolutions, _.add);

    return _.map(possibleSolutionSum, function (c) {
      if (c === 0) {
        return 0;
      } else if (c === possibleSolutions.length) {
        return 2;
      } else {
        return 1;
      }
    });
  };

  this.matchCellsWithSolution = function (cells, solution) {
    if (cells.length !== solution.length) {
      throw new Error('Lengtes van cells en oplossing zijn verschillend + ' + cells.length + '!=' + solution.length);
    }

    for (var i = 0; i < cells.length; i++) {
      if (cells[i].value === 0 && solution[i] !== 0) {
        return false;
      } else if (cells[i].value === 2 && solution[i] !== 1) {
        return false;
      }
    }

    return true;
  };

  /**
   * Vind alle mogelijke oplossingen, gegeven de definities en het aantal Cells. Oplossingen zijn gecodeert
   * als een array van nullen (niet ingekleurd) en enen (ingekleurd).
   *
   * @param definition
   * @param nrCells
   *
   * @return {number[][]} oplossingen
   */
  this.findAllSolutions = function (definition, nrCells) {
    if (definition.length < 1) {
      throw new Error('Kan alleen omgaan met minimaal 1 element in definition');
    }

    var bins = definition.length + 1;
    var cellsNeeded = _.sum(definition) + definition.length - 1;

    var dists = this.findAllSpaceDistributions(nrCells - cellsNeeded, bins);

    return _.map(dists, _.partial(this.createSolution, definition));
  };

  this.createSolution = function (definition, spaceDistribution) {
    if (definition.length !== spaceDistribution.length - 1) {
      throw new Error('Kan geen oplossing maken van ' + definition.length + ' defs en ' + spaceDistribution.length + ' spatie verdelingen');
    }

    var nrCells = _.sum(definition) + _.sum(spaceDistribution) + definition.length - 1;

    var solution = new Array(nrCells);
    _.fill(solution, 0);

    var cursor = 0;

    for (var i = 0; i < definition.length; i++) {
      // Een verplichte vrije ruimte voor elke niet-eerste definition
      if (i !== 0) {
        cursor++;
      }
      cursor += spaceDistribution[i];

      _.fill(solution, 1, cursor, cursor + definition[i]);
      cursor += definition[i];
    }

    return solution;

  };

  /**
   * Vind hoe de extra spaties verdeeld moeten worden over de ruimten tussen de ingekleurde vakken.
   *
   * @param spaces
   * @param bins
   * @returns {number[][]} verdelingen
   */
  this.findAllSpaceDistributions = function (spaces, bins) {
    if (bins === 1) {
      // Enkele ruimte, vul met alle spaties
      return [[spaces]];
    } else {
      var dists = [];

      // Voor elke mogelijk invulling van de eerste ruimte: bepaal de rest van de ruimten recursief
      for (var spacesFirstBin = 0; spacesFirstBin <= spaces; spacesFirstBin++) {
        var subDists = this.findAllSpaceDistributions(spaces - spacesFirstBin, bins - 1);
        for (var j = 0; j < subDists.length; j++) {
          var subDistCopy = subDists[j].slice();
          subDistCopy.unshift(spacesFirstBin);
          dists.push(subDistCopy);
        }
      }
      return dists;
    }
  };

}

module.exports = NonogramSolver;
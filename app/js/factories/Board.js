module.exports = function (Square) {

    /**
    * @param rows Array
    * @param columns Array
    */
    return function(rows, columns) {

        // Is given board valid
        if (!Array.isArray(rows) || !Array.isArray(columns)) {
            console.error('Board factory expects rows & columns params of type Array!');
            return false;
        }

        var self = this;

        this.rows = rows;
        this.columns = columns;
        this.cells = [];

        var filterCells = function(axis, index) {
            var result = [];

            self.cells.forEach(function(cell) {
                if (cell[axis] === index) {
                    result.push(cell);
                }
            });

            return result;
        };

        var convertCellsToNumbers = function(cellList) {
            var result = '';

            cellList.forEach(function(cell) {
                result += (cell.status === 1 ? '1' : '0');
            });

            return result;
        };

        var createRegexFromSetting = function(cellList) {
            var regex = '';

            for (var i = 0; i < cellList.length; ++i) {
                if (regex.length !== 0) {
                    regex += '0+';
                }

                regex += '1{' + cellList[i] + '}';
            }

            return '^0*' + regex + '0*$';
        };

        var validateData = function(item, index, axis) {
            var regex = createRegexFromSetting(item);
            var numbers = convertCellsToNumbers(filterCells(axis, index));
            var regex = new RegExp(regex);

            return regex.test(numbers);
        };

        this.generate = function() {
            var lastRow;
            rows.forEach(function(row, rowIndex) {
                columns.forEach(function(column, columnIndex) {
                    var cell = new Square(columnIndex, rowIndex);
                    if (lastRow !== rowIndex) {
                        cell.last = true;
                    }
                    self.cells.push(cell);
                    lastRow = rowIndex;
                });
            });
        };

        this.isValid = function() {
            // First we check if the rows have the correct amount of squares. Than we check if the columns have the
            // correct amount of squares. When both are valid, we know the board is valid.

            for (var r = 0; r < self.rows.length; ++r) {
                if (!validateData(self.rows[r], r, 'y')) {
                    return false;
                }
            }

            for (var c = 0; c < self.columns.length; ++c) {
                if (!validateData(self.columns[c], c, 'x')) {
                    return false;
                }
            }

            // Fill the unfilled cells for a nicer view ;)
            self.cells.forEach(function(cell) {
                cell.status = cell.status === 0 ? 2 : cell.status;
            });

            return true;
        };

        return this;
    }
};

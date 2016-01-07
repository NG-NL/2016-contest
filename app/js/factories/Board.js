module.exports = function (Square) {

    /**
    * @param x Array
    * @param y Array
    */
    return function(x, y) {

        // Is given board valid
        if (!Array.isArray(x) || !Array.isArray(y)) {
            console.error('Board factory expects x & y params of type Array!');
            return false;
        }

        var self = this;
        this.count = {
            columns: y.length,
            rows: x.length,
        };
        this.x = x;
        this.y = y;
        this.cells = [];

        this.square = {
            size: 30,
            unit: 'px',
        }

        this.generate = function() {
            var lastRow;
            x.forEach(function(row, rowIndex) {
                y.forEach(function(column, columnIndex) {
                    var cell = new Square(columnIndex, rowIndex);
                    cell.setSize(self.square.size);
                    cell.setUnit(self.square.unit);
                    if (lastRow !== rowIndex) {
                        cell.last = true;
                    }
                    self.cells.push(cell);
                    lastRow = rowIndex;
                });
            });
        }

        this.setSquareSize = function(size) {
            this.square.size = size;
        };

        this.setSquareUnit = function(unit) {
            this.square.unit = unit;
        };

        return this;
    }
};

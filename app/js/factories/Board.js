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

        this.x = x;
        this.y = y;
        this.cells = [];

        this.generate = function() {
            var lastRow;
            x.forEach(function(row, rowIndex) {
                y.forEach(function(column, columnIndex) {
                    var cell = new Square(columnIndex, rowIndex);
                    if (lastRow !== rowIndex) {
                        cell.last = true;
                    }
                    self.cells.push(cell);
                    lastRow = rowIndex;
                });
            });
        }

        return this;
    }
};

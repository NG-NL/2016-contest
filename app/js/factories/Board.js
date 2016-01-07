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

        this.count = {
            columns: y.length,
            rows: x.length,
        };
        this.x = x;
        this.y = y;
        this.cells = [];

        var self = this;

        x.forEach(function(row, rowIndex) {
            y.forEach(function(column, columnIndex) {
                var cell = new Square(columnIndex, rowIndex);
                self.cells.push(cell);
            });
        });

        return this;
    }
};

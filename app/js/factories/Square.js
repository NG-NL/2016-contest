module.exports = function () {

    /**
    * @param x Int The x position
    * @param y Int The y position
    */
    return function(x, y) {

        var self = this;
        this.x = x;
        this.y = y;

        // 0 => undefined (not clicked yet)
        // 1 => Filled
        // 2 => Empty
        this.status = 0;

        this.changeStatus = function() {
            if (this.status < 2) {
                this.status = this.status + 1;
            } else {
                this.status = 0;
            }
        };

        return this;
    }
};

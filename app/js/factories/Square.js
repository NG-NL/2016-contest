module.exports = function () {

    /**
    * @param x Int The x position
    * @param y Int The y position
    */
    return function(x, y) {

        this.x = x;
        this.y = y;
        this.size = 30;
        this.unit = 'px';
        this.left = (this.x * this.size) + this.unit;
        this.top = (this.y * this.size) + this.unit;
        this.style = {
            left: this.left,
            top: this.top,
        };

        // 0 => undefined (not clicked yet)
        // 1 => Filled
        // 2 => Empty
        this.status = 0;

        this.setSize = function(size) {
            this.size = size;
        };

        this.setUnit = function(unit) {
            this.unit = unit;
        };

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

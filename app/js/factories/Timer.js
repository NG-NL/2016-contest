module.exports = function () {

    return function() {

        var self = this;
        this.status = 0; // 0 pause & 1 loop
        this.time = 0;



        var loop = function() {
            self.interval = setTimeout(function() {
                console.log('loop', self.status === 1);
                if (self.status === 1) {
                    self.time = self.time + 1;
                    loop;
                }
            }, 1000)
        };

        this.start = function() {
            console.log('enters start');
            self.status = 1;
            loop();
        };

        this.stop = function() {
            self.status = 0;
            clearTimeout(self.interval);
        }

        return this;
    }
};

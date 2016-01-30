System.register([], function(exports_1) {
    var LineCtrl;
    return {
        setters:[],
        execute: function() {
            LineCtrl = (function () {
                function LineCtrl() {
                    this.isCorrect = function (line) {
                        var filled = [];
                        var temp = 0;
                        for (var field = 0; field < line.fields.length; field++) {
                            if (line.fields[field].state.filled) {
                                temp++;
                                if (field + 1 == line.fields.length) {
                                    filled.push(temp);
                                }
                            }
                            else if (temp > 0) {
                                filled.push(temp);
                                temp = 0;
                            }
                        }
                        if (filled.length !== line.data.length) {
                            return false;
                        }
                        return filled.reverse().toString() == line.data.toString();
                    };
                }
                LineCtrl.prototype.createLine = function () {
                    return {
                        fields: [],
                        data: [],
                        state: {
                            'row': true,
                            'blockRow': false,
                            'correct': false
                        }
                    };
                };
                return LineCtrl;
            })();
            exports_1("LineCtrl", LineCtrl);
        }
    }
});
System.register([], function(exports_1) {
    var FieldCtrl;
    return {
        setters:[],
        execute: function() {
            FieldCtrl = (function () {
                function FieldCtrl() {
                    var _this = this;
                    this.showHint = function (field, on) {
                        field.show = on;
                        if (!field.state.dataField) {
                            if (field.solution > 0 && on) {
                                _this.setFilled(field);
                            }
                            else {
                                _this.setEmpty(field);
                            }
                        }
                    };
                    this.solveSingle = function (field, event) {
                        if (event.ctrlKey) {
                            _this.showHint(field, true);
                        }
                    };
                    this.setDataField = function (field) {
                        field.state.dataField = true;
                        field.state.filled = false;
                        field.state.empty = false;
                        field.state.cross = false;
                    };
                    this.setEmpty = function (field) {
                        field.state.empty = true;
                        field.state.filled = false;
                        field.state.cross = false;
                    };
                    this.setFilled = function (field) {
                        field.state.filled = true;
                        field.state.empty = false;
                        field.state.cross = false;
                    };
                    this.setCross = function (field) {
                        field.state.cross = true;
                        field.state.filled = false;
                        field.state.empty = false;
                    };
                    this.switch = function (field) {
                        if (field.state.dataField && field.value) {
                            field.state.cross = !field.state.cross;
                        }
                        else {
                            if (field.state.empty) {
                                _this.setFilled(field);
                            }
                            else if (field.state.filled) {
                                _this.setCross(field);
                            }
                            else if (field.state.cross) {
                                _this.setEmpty(field);
                            }
                        }
                    };
                }
                FieldCtrl.prototype.createField = function () {
                    return {
                        state: {
                            'field': true,
                            'empty': true,
                            'filled': false,
                            'cross': false,
                            'dataField': false,
                            'blockColumn': false,
                            'correct': false
                        },
                        show: false,
                        solution: 0
                    };
                };
                return FieldCtrl;
            })();
            exports_1("FieldCtrl", FieldCtrl);
        }
    }
});
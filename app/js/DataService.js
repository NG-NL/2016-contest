System.register(['angular2/core', "./nonogramData"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, nonogramData_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nonogramData_1_1) {
                nonogramData_1 = nonogramData_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService() {
                }
                DataService.prototype.getData = function () {
                    return Promise.resolve(nonogramData_1.games);
                };
                DataService = __decorate([
                    core_1.Injectable()
                ], DataService);
                return DataService;
            })();
            exports_1("DataService", DataService);
        }
    }
});
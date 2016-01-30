System.register(['angular2/core', 'angular2/common', "./Grid.component", "./DataService", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, Grid_component_1, DataService_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Grid_component_1_1) {
                Grid_component_1 = Grid_component_1_1;
            },
            function (DataService_1_1) {
                DataService_1 = DataService_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(dataService) {
                    var _this = this;
                    this.gameMode = ['easy', 'normal', 'hard'];
                    this.defaultNrOfFields = 15;
                    this.minLines = 5;
                    this.maxLines = 100;
                    this.errorTexts = [];
                    this.gridCtrl = new Grid_component_1.GridCtrl();
                    this.nrOfrandomGames = 0;
                    this.nrOfCustomGames = 0;
                    this.init = function (gameData) {
                        _this.offsetLeft = 0;
                        _this.offsetTop = 0;
                        _this.gameData = gameData || _this.games[_this.getGameIndex()];
                        _this.getOffsetLeft();
                        _this.getOffsetTop();
                        _this.grid = _this.gameData.grid || _this.gridCtrl.createGrid(_this.gameData, _this.offsetLeft, _this.offsetTop);
                    };
                    this.setErrorText = function (text, time) {
                        time = time || 3000;
                        _this.errorTexts.push(text);
                        setTimeout(function () {
                            _this.errorTexts.splice(_this.errorTexts.indexOf(text), 1);
                        }, time);
                    };
                    this.cancelCreateCustom = function () {
                        _this.tempGame = null;
                        _this.init(_this.games[_this.getGameIndex()]);
                    };
                    this.nextGame = function () {
                        if (!_this.tempGame) {
                            _this.saveCurrentState();
                        }
                        _this.tempGame = null;
                        var gameIndex = _this.games[_this.getGameIndex() + 1] ? _this.getGameIndex() + 1 : 0;
                        _this.init(_this.games[gameIndex]);
                    };
                    this.saveCurrentState = function () {
                        _this.games[_this.getGameIndex()].grid = _this.grid;
                    };
                    this.getGameIndex = function () {
                        var gameIndex = 0;
                        for (var i = 0; i < _this.games.length; i++) {
                            if (_this.games[i].name == _this.grid.name) {
                                gameIndex = i;
                            }
                        }
                        return gameIndex;
                    };
                    this.generateNew = function (height, width) {
                        _this.saveCurrentState();
                        _this.tempGame = null;
                        height = _this.getNewGridHeight(height);
                        width = _this.getNewGridWidth(width);
                        var rows = [];
                        var columns = [];
                        var solutionRows = [];
                        var solutionColumns = [];
                        // Fills the rows with random positive and negative numbers.
                        // The negative numbers will be the empty spaces and the positive numbers the filled spaces
                        for (var i = 0; i < height; i++) {
                            solutionRows[i] = _this.fillRowWithNumbers(width);
                        }
                        // The last field of at least one row has to be positive.
                        var atLeastOnePositive = false;
                        for (var i = 0; i < height; i++) {
                            if (solutionRows[i][solutionRows.length - 1] == 1) {
                                atLeastOnePositive = true;
                            }
                        }
                        // If not, add one positive integer
                        if (!atLeastOnePositive) {
                            var randomSpace = Math.floor((Math.random() * height) + 1);
                            solutionRows[randomSpace][solutionRows.length - 1] = 1;
                        }
                        // The last row has to have at least one positive.
                        var atLeastOnePositive = false;
                        for (var i = 0; i < width; i++) {
                            if (solutionRows[solutionRows.length - 1][i] == 1) {
                                atLeastOnePositive = true;
                            }
                        }
                        // If not, add one positive integer
                        if (!atLeastOnePositive) {
                            var randomSpace = Math.floor((Math.random() * width) + 1);
                            solutionRows[solutionRows.length - 1][randomSpace] = 1;
                        }
                        // Fill solution columns
                        for (var column = 0; column < width; column++) {
                            solutionColumns[column] = [];
                            for (var row = 0; row < height; row++) {
                                solutionColumns[column][row] = solutionRows[row][column];
                            }
                        }
                        columns = _this.calcAndFillColumns(solutionColumns, columns);
                        rows = _this.calcAndFillRows(solutionRows, rows);
                        var newGame = {
                            rows: rows,
                            columns: columns,
                            solution: solutionRows,
                            name: 'random' + ++_this.nrOfrandomGames
                        };
                        _this.games.push(newGame);
                        _this.init(newGame);
                    };
                    this.getNewGridHeight = function (height) {
                        if (height) {
                            if (height < _this.minLines) {
                                height = _this.minLines;
                                _this.setErrorText('Min height is ' + _this.minLines + '. Height is set to ' + _this.minLines);
                            }
                            else if (height > _this.maxLines) {
                                height = _this.maxLines;
                                _this.setErrorText(_this.errorTexts = 'Max height is ' + _this.maxLines + '. Height is set to ' + _this.maxLines);
                            }
                            else if (isNaN(height)) {
                                height = _this.minLines;
                                _this.setErrorText('Input height is not a number. Height is set to ' + _this.minLines);
                            }
                        }
                        else {
                            height = _this.defaultNrOfFields;
                        }
                        return height;
                    };
                    this.getNewGridWidth = function (width) {
                        if (width) {
                            if (width < _this.minLines) {
                                _this.setErrorText('Min width is ' + _this.minLines + '. Width is set to ' + _this.minLines);
                                width = _this.minLines;
                            }
                            else if (width > _this.maxLines) {
                                _this.setErrorText('Max width is ' + _this.maxLines + '. Width is set to ' + _this.maxLines);
                                width = _this.maxLines;
                            }
                            else if (isNaN(width)) {
                                width = _this.minLines;
                                _this.setErrorText('Input width is not a number. Width is set to ' + _this.minLines);
                            }
                        }
                        else {
                            width = _this.defaultNrOfFields;
                        }
                        return width;
                    };
                    this.getDifficulty = function () {
                        var d = 1.3;
                        switch (_this.difficulty) {
                            case 'easy':
                                d = 1.3;
                                break;
                            case 'normal':
                                d = 1.5;
                                break;
                            case 'hard':
                                d = 2.5;
                                break;
                        }
                        return d;
                    };
                    this.fillRowWithNumbers = function (width) {
                        var d = _this.getDifficulty();
                        var row = [];
                        for (var i = 0; i < width; i++) {
                            var positive = Math.floor(Math.random() * d) < 1;
                            if (positive) {
                                row.push(1);
                            }
                            else {
                                row.push(-1);
                            }
                        }
                        return row;
                    };
                    this.getOffsetLeft = function () {
                        _this.gameData.rows.forEach(function (row) {
                            if (row.length > _this.offsetLeft) {
                                _this.offsetLeft = row.length;
                            }
                        });
                    };
                    this.getOffsetTop = function () {
                        _this.gameData.columns.forEach(function (column) {
                            if (column.length > _this.offsetTop) {
                                _this.offsetTop = column.length;
                            }
                        });
                    };
                    this.createCustom = function (width, height) {
                        _this.saveCurrentState();
                        var rows = [];
                        var columns = [];
                        _this.offsetLeft = 1;
                        _this.offsetTop = 1;
                        height = _this.getNewGridHeight(height);
                        width = _this.getNewGridWidth(width);
                        for (var i = 0; i < height; i++) {
                            var emptyRow = [];
                            for (var j = 0; j < width; j++) {
                                emptyRow.push(0);
                            }
                            rows.push(emptyRow);
                        }
                        for (var column = 0; column < width; column++) {
                            columns[column] = [];
                            for (var row = 0; row < height; row++) {
                                columns[column][row] = rows[row][column];
                            }
                        }
                        var game = {
                            rows: rows,
                            columns: columns,
                            name: 'custom' + ++_this.nrOfCustomGames
                        };
                        _this.tempGame = game;
                        _this.grid = _this.gridCtrl.createGrid(game, _this.offsetLeft, _this.offsetTop);
                    };
                    this.saveCustom = function () {
                        var solutionRows = [];
                        var solutionColumns = [];
                        var columns = [];
                        var rows = [];
                        var rowPos = 0;
                        var somethingFilled = false;
                        _this.grid.playRows.forEach(function (row) {
                            var tempRow = [];
                            row.fields.forEach(function (field) {
                                if (field.state.filled) {
                                    tempRow.push(1);
                                    somethingFilled = true;
                                }
                                else {
                                    tempRow.push(-1);
                                }
                            });
                            solutionRows[rowPos] = tempRow;
                            rowPos++;
                        });
                        if (!somethingFilled) {
                            _this.setErrorText('Can\'t save an empty grid!', 2000);
                        }
                        else {
                            // Fill solution columns
                            for (var column = 0; column < _this.grid.playColumns.length; column++) {
                                solutionColumns[column] = [];
                                for (var row = 0; row < _this.grid.playRows.length; row++) {
                                    solutionColumns[column][row] = solutionRows[row][column];
                                }
                            }
                            columns = _this.calcAndFillColumns(solutionColumns, columns);
                            rows = _this.calcAndFillRows(solutionRows, rows);
                            _this.tempGame.columns = columns;
                            _this.tempGame.rows = rows;
                            _this.tempGame.solution = solutionRows;
                            _this.games.push(_this.tempGame);
                            _this.init(_this.tempGame);
                            _this.tempGame = null;
                        }
                    };
                    this.calcAndFillRows = function (solutionRows, rows) {
                        for (var sRow = 0; sRow < solutionRows.length; sRow++) {
                            rows[sRow] = [];
                            var tempPos = 0;
                            for (var field = 0; field < solutionRows[sRow].length; field++) {
                                if (solutionRows[sRow][field] > 0) {
                                    tempPos++;
                                    if (field == solutionRows[sRow].length - 1) {
                                        rows[sRow].push(tempPos);
                                    }
                                }
                                else {
                                    if (tempPos != 0) {
                                        rows[sRow].push(tempPos);
                                        tempPos = 0;
                                    }
                                }
                            }
                            rows[sRow].reverse();
                        }
                        return rows;
                    };
                    this.calcAndFillColumns = function (solutionColumns, columns) {
                        // Fill Columns
                        for (var sColumn = 0; sColumn < solutionColumns.length; sColumn++) {
                            columns[sColumn] = [];
                            var tempPos = 0;
                            for (var field = 0; field < solutionColumns[sColumn].length; field++) {
                                if (solutionColumns[sColumn][field] > 0) {
                                    tempPos++;
                                    if (field == solutionColumns[sColumn].length - 1) {
                                        columns[sColumn].push(tempPos);
                                    }
                                }
                                else {
                                    if (tempPos != 0) {
                                        columns[sColumn].push(tempPos);
                                        tempPos = 0;
                                    }
                                }
                            }
                            columns[sColumn].reverse();
                        }
                        return columns;
                    };
                    dataService.getData().then(function (result) {
                        _this.games = result;
                        _this.init(_this.games[0]);
                    });
                }
                AppComponent.prototype.deleteGame = function (name, index) {
                    if (name !== 'ng-nl game') {
                        if (index == this.getGameIndex()) {
                            this.nextGame();
                            this.games.splice(index, 1);
                        }
                        else {
                            this.games.splice(index, 1);
                        }
                    }
                };
                AppComponent.prototype.loadGame = function (index) {
                    this.init(this.games[index]);
                };
                __decorate([
                    core_1.Input()
                ], AppComponent.prototype, "height");
                __decorate([
                    core_1.Input()
                ], AppComponent.prototype, "width");
                __decorate([
                    core_1.Input()
                ], AppComponent.prototype, "gameMode");
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/templates/main.html',
                        styleUrls: ['app/css/main.css'],
                        directives: [common_1.NgClass, common_1.NgStyle],
                        providers: [DataService_1.DataService]
                    }),
                    __param(0, core_2.Inject(DataService_1.DataService))
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
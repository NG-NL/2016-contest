System.register(["./Line.component", "./Field.component"], function(exports_1) {
    var Line_component_1, Field_component_1;
    var GridCtrl;
    return {
        setters:[
            function (Line_component_1_1) {
                Line_component_1 = Line_component_1_1;
            },
            function (Field_component_1_1) {
                Field_component_1 = Field_component_1_1;
            }],
        execute: function() {
            GridCtrl = (function () {
                function GridCtrl() {
                    var _this = this;
                    this.showSolution = function (grid) {
                        if (grid.playRows[0].fields[0].solution) {
                            grid.show = !grid.show;
                            if (grid.show) {
                                grid.solve = 'Reset';
                            }
                            else {
                                grid.solve = 'Solve Nonogram';
                            }
                            for (var row = 0; row < grid.playRows.length; row++) {
                                grid.playRows[row].fields.forEach(function (field) {
                                    _this.fieldCtrl.showHint(field, grid.show);
                                });
                            }
                            _this.checkGrid(grid);
                        }
                        else {
                            for (var row = 0; row < grid.playRows.length; row++) {
                                grid.playRows[row].fields.forEach(function (field) {
                                    _this.fieldCtrl.showHint(field, grid.show);
                                });
                            }
                        }
                    };
                    this.removeNullsFromDataArray = function (lines) {
                        lines.forEach(function (line) {
                            line.data.forEach(function (number) {
                                if (!number) {
                                    line.data.slice(line.data.indexOf(number));
                                }
                            });
                        });
                    };
                    this.drawHorizontalBlockLines = function (grid, offsetTop) {
                        for (var i = 4 + offsetTop; i < grid.gridRows.length; i = i + 5) {
                            grid.gridRows[i].state.blockRow = true;
                        }
                    };
                    this.drawVerticalBlockLines = function (grid, offsetLeft) {
                        for (var i = 4 + offsetLeft; i < grid.gridColumns.length; i = i + 5) {
                            grid.gridColumns[i].fields.forEach(function (field) {
                                field.state.blockColumn = true;
                                grid.totalWidthInPx++;
                            });
                        }
                        grid.gridColumns[offsetLeft - 1].fields.forEach(function (field) {
                            field.state.blockColumn = true;
                        });
                    };
                    this.setDataToDataFields = function (grid, gameData, offsetLeft, offsetTop) {
                        _this.fillDataFieldsRows(grid, offsetTop, gameData.rows, offsetLeft);
                        _this.fillDataFieldsColumns(grid, offsetLeft, gameData.columns, offsetTop);
                    };
                    this.gridCorrect = function (grid) {
                        var isCorrect = true;
                        grid.playColumns.forEach(function (column) {
                            if (!_this.lineCtrl.isCorrect(column)) {
                                isCorrect = false;
                            }
                        });
                        grid.playRows.forEach(function (row) {
                            if (!_this.lineCtrl.isCorrect(row)) {
                                isCorrect = false;
                            }
                        });
                        return isCorrect;
                    };
                    this.checkGrid = function (grid) {
                        _this.setFieldsCorrect(grid, _this.gridCorrect(grid));
                    };
                    this.setFieldsCorrect = function (grid, isCorrect) {
                        grid.gridColumns.forEach(function (column) {
                            column.state.correct = isCorrect;
                            column.fields.forEach(function (field) {
                                field.state.correct = isCorrect;
                            });
                        });
                        grid.gridRows.forEach(function (row) {
                            row.state.correct = isCorrect;
                            row.fields.forEach(function (field) {
                                field.state.correct = isCorrect;
                            });
                        });
                    };
                    this.createGridRows = function (grid, gameData, offsetLeft, offsetTop) {
                        var nrOfRows = gameData.rows.length;
                        var nrOfColumns = gameData.columns.length;
                        var rowLength = nrOfColumns + offsetLeft;
                        for (var i = 0; i < nrOfRows + offsetTop; i++) {
                            var newRow = _this.lineCtrl.createLine();
                            var newPlayRow = _this.lineCtrl.createLine();
                            var isDataRow = i < offsetTop;
                            if (!isDataRow) {
                                var newPlayRow = _this.lineCtrl.createLine();
                                newRow.data = gameData.rows[i - offsetTop];
                                newPlayRow.data = gameData.rows[i - offsetTop];
                                grid.playRows.push(newPlayRow);
                            }
                            _this.fillGridRow(newRow, newPlayRow, rowLength, offsetLeft, isDataRow);
                            grid.gridRows.push(newRow);
                        }
                    };
                    this.fillGridRow = function (row, playRow, rowLength, offsetLeft, isDataRow) {
                        for (var i = 0; i < rowLength; i++) {
                            var newField = _this.fieldCtrl.createField();
                            if (i < offsetLeft || isDataRow) {
                                _this.fieldCtrl.setDataField(newField);
                            }
                            else {
                                playRow.fields.push(newField);
                            }
                            row.fields.push(newField);
                        }
                    };
                    this.createPlayColumns = function (grid, columnData) {
                        for (var i = 0; i < grid.playRows[0].fields.length; i++) {
                            var newLine = _this.lineCtrl.createLine();
                            newLine.data = columnData[i];
                            grid.playColumns.push(newLine);
                        }
                        _this.fillPlayColumns(grid);
                    };
                    this.createGridColumns = function (grid, columnData, offsetLeft) {
                        for (var i = 0; i < grid.gridRows[0].fields.length; i++) {
                            var newLine = _this.lineCtrl.createLine();
                            newLine.data = columnData[i - offsetLeft];
                            grid.gridColumns.push(newLine);
                        }
                        _this.fillGridColumns(grid);
                    };
                    this.fillGridColumns = function (grid) {
                        for (var row = 0; row < grid.gridRows.length; row++) {
                            for (var field = 0; field < grid.gridRows[row].fields.length; field++) {
                                grid.gridColumns[field].fields[row] = grid.gridRows[row].fields[field];
                            }
                        }
                    };
                    this.fillPlayColumns = function (grid) {
                        for (var row = 0; row < grid.playRows.length; row++) {
                            for (var field = 0; field < grid.playRows[row].fields.length; field++) {
                                grid.playColumns[field].fields[row] = grid.playRows[row].fields[field];
                            }
                        }
                    };
                    this.fillDataFieldsColumns = function (grid, offsetLeft, columnData, offsetTop) {
                        for (var column = offsetLeft; column < grid.gridColumns.length; column++) {
                            var colData = columnData[column - offsetLeft];
                            for (var field = 0; field < offsetTop; field++) {
                                grid.gridColumns[column].fields[offsetTop - field - 1].value = colData[field];
                            }
                        }
                    };
                    this.fillDataFieldsRows = function (grid, offsetTop, rowData, offsetLeft) {
                        for (var row = offsetTop; row < grid.gridRows.length; row++) {
                            var rData = rowData[row - offsetTop];
                            for (var field = 0; field < offsetLeft; field++) {
                                grid.gridRows[row].fields[offsetLeft - field - 1].value = rData[field];
                            }
                        }
                    };
                    this.fieldCtrl = new Field_component_1.FieldCtrl();
                    this.lineCtrl = new Line_component_1.LineCtrl();
                }
                GridCtrl.prototype.createGrid = function (gameData, offsetLeft, offsetTop) {
                    var grid = {
                        gridRows: [],
                        gridColumns: [],
                        playColumns: [],
                        playRows: [],
                        show: false,
                        solve: 'Reset',
                        totalWidthInPx: 0,
                        drawingLine: false,
                        name: gameData.name
                    };
                    this.createGridRows(grid, gameData, offsetLeft, offsetTop);
                    this.createGridColumns(grid, gameData.columns, offsetLeft);
                    this.createPlayColumns(grid, gameData.columns);
                    this.drawVerticalBlockLines(grid, offsetLeft);
                    this.drawHorizontalBlockLines(grid, offsetTop);
                    this.removeNullsFromDataArray(grid.playColumns);
                    this.removeNullsFromDataArray(grid.playRows);
                    if (gameData.solution) {
                        for (var row = 0; row < grid.playRows.length; row++) {
                            for (var i = 0; i < gameData.solution[row].length; i++) {
                                grid.playRows[row].fields[i].solution = gameData.solution[row][i];
                            }
                        }
                        grid.solve = 'Solve Nonogram';
                    }
                    this.setDataToDataFields(grid, gameData, offsetLeft, offsetTop);
                    this.calcGridWidthInPx(grid);
                    return grid;
                };
                GridCtrl.prototype.setActiveLines = function (grid, rowIndex, fieldIndex) {
                    if (grid.drawingLine && grid.playRows[rowIndex]) {
                        if (grid.playRows[rowIndex].fields[fieldIndex]) {
                            var field = grid.playRows[rowIndex].fields[fieldIndex];
                            this.fieldCtrl.setFilled(field);
                        }
                    }
                };
                GridCtrl.prototype.setUnclicked = function (grid) {
                    grid.drawingLine = false;
                };
                GridCtrl.prototype.setClicked = function (grid) {
                    grid.drawingLine = true;
                };
                GridCtrl.prototype.calcGridWidthInPx = function (grid) {
                    var fieldWidth = 16; // 15px width + 1px border on one side.
                    var outsideBordersAndRightDataBorder = 3;
                    var fieldsPerBlockColumn = 5;
                    grid.totalWidthInPx = (grid.gridColumns.length * fieldWidth) + outsideBordersAndRightDataBorder;
                    grid.totalWidthInPx += Math.ceil(grid.playColumns.length / fieldsPerBlockColumn);
                };
                ;
                return GridCtrl;
            })();
            exports_1("GridCtrl", GridCtrl);
        }
    }
});
import {Line, LineCtrl} from "./Line.component";
import {Field, FieldCtrl} from "./Field.component";
import {Component} from "angular2/core";
import {IGame} from "./nonogramData";

@Component({
    selector: 'myGrid',
    template: '',
})

export interface Grid {
    gridRows:Line[];
    gridColumns:Line[];

    playColumns:Line[];
    playRows:Line[];

    show:boolean;
    solve:string;
    totalWidthInPx:number;
    drawingLine: boolean;

    name: string;
}

export class GridCtrl {
    fieldCtrl:FieldCtrl;
    lineCtrl:LineCtrl;

    constructor() {
        this.fieldCtrl = new FieldCtrl();
        this.lineCtrl = new LineCtrl();
    }

    public createGrid(gameData:IGame, offsetLeft:number, offsetTop:number):Grid {
        var grid:Grid = {
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
        this.createGridColumns(grid,gameData.columns, offsetLeft);
        this.createPlayColumns(grid, gameData.columns);

        this.drawVerticalBlockLines(grid, offsetLeft);
        this.drawHorizontalBlockLines(grid, offsetTop);

        this.removeNullsFromDataArray(grid.playColumns);
        this.removeNullsFromDataArray(grid.playRows);

        if(gameData.solution) {
            for(var row = 0; row < grid.playRows.length; row++) {
                for(var i = 0; i < gameData.solution[row].length; i++) {
                    grid.playRows[row].fields[i].solution = gameData.solution[row][i];
                }
            }
            grid.solve = 'Solve Nonogram';
        }

        this.setDataToDataFields(grid, gameData, offsetLeft, offsetTop);
        this.calcGridWidthInPx(grid);

        return grid;
    }

    private setActiveLines(grid:Grid, rowIndex:number, fieldIndex:number) {
        if(grid.drawingLine && grid.playRows[rowIndex]) {
            if(grid.playRows[rowIndex].fields[fieldIndex]) {
                var field = grid.playRows[rowIndex].fields[fieldIndex];
                this.fieldCtrl.setFilled(field);
            }
        }
    }

    private setUnclicked(grid:Grid) {
        grid.drawingLine = false;
    }

    private setClicked(grid:Grid) {
        grid.drawingLine = true;
    }

    private calcGridWidthInPx(grid:Grid):void {
        var fieldWidth:number = 16; // 15px width + 1px border on one side.
        var outsideBordersAndRightDataBorder:number = 3;
        var fieldsPerBlockColumn:number = 5;

        grid.totalWidthInPx = (grid.gridColumns.length * fieldWidth) + outsideBordersAndRightDataBorder;
        grid.totalWidthInPx += Math.ceil(grid.playColumns.length / fieldsPerBlockColumn);
    };

    public showSolution = (grid:Grid):void => {
        if(grid.playRows[0].fields[0].solution) {
            grid.show = !grid.show;
            if(grid.show) {
                grid.solve = 'Reset';
            } else {
                grid.solve = 'Solve Nonogram';
            }
            for(var row = 0; row < grid.playRows.length; row++) {
                grid.playRows[row].fields.forEach(field => {
                    this.fieldCtrl.showHint(field, grid.show);
                });
            } this.checkGrid(grid);
        } else {
            for(var row = 0; row < grid.playRows.length; row++) {
                grid.playRows[row].fields.forEach(field => {
                    this.fieldCtrl.showHint(field, grid.show);
                });
            }
        }
    };

    private removeNullsFromDataArray = (lines: Line[]) => {
        lines.forEach(line => {
            line.data.forEach(number => {
                if (!number) {
                    line.data.slice(line.data.indexOf(number));
                }
            });
        });
    };

    private drawHorizontalBlockLines = (grid:Grid, offsetTop:number):void => {
        for (var i = 4 + offsetTop; i < grid.gridRows.length; i = i + 5) {
            grid.gridRows[i].state.blockRow = true;
        }
    };

    private drawVerticalBlockLines = (grid:Grid, offsetLeft:number):void => {
        for (var i = 4 + offsetLeft; i < grid.gridColumns.length; i = i + 5) {
            grid.gridColumns[i].fields.forEach(field => {
                field.state.blockColumn = true;
                grid.totalWidthInPx++;
            });
        }
        grid.gridColumns[offsetLeft - 1].fields.forEach(field => {
            field.state.blockColumn = true;
        });
    };

    private setDataToDataFields = (grid:Grid, gameData:IGame, offsetLeft:number, offsetTop:number) => {
        this.fillDataFieldsRows(grid, offsetTop, gameData.rows, offsetLeft);
        this.fillDataFieldsColumns(grid, offsetLeft, gameData.columns, offsetTop);
    };

    public gridCorrect = (grid:Grid):boolean => {
        var isCorrect:boolean = true;

        grid.playColumns.forEach(column => {
            if (!this.lineCtrl.isCorrect(column)) {
                isCorrect = false;
            }
        });

        grid.playRows.forEach(row => {
            if (!this.lineCtrl.isCorrect(row)) {
                isCorrect = false;
            }
        });
        return isCorrect;
    };

    public checkGrid = (grid:Grid) => {
        this.setFieldsCorrect(grid, this.gridCorrect(grid));
    };

    private setFieldsCorrect = (grid:Grid, isCorrect:boolean):void => {
        grid.gridColumns.forEach(column => {
            column.state.correct = isCorrect;
            column.fields.forEach(field => {
                field.state.correct = isCorrect;
            })
        });
        grid.gridRows.forEach(row => {
            row.state.correct = isCorrect;
            row.fields.forEach(field => {
                field.state.correct = isCorrect;
            })
        });
    };

    private createGridRows = (grid:Grid, gameData:IGame, offsetLeft:number, offsetTop:number):void => {
        var nrOfRows:number = gameData.rows.length;
        var nrOfColumns:number = gameData.columns.length;
        var rowLength:number = nrOfColumns + offsetLeft;

        for (var i = 0; i < nrOfRows + offsetTop; i++) {

            var newRow:Line = this.lineCtrl.createLine();
            var newPlayRow:Line = this.lineCtrl.createLine();
            var isDataRow:boolean = i < offsetTop;

            if (!isDataRow) {
                var newPlayRow:Line = this.lineCtrl.createLine();
                newRow.data = gameData.rows[i - offsetTop];
                newPlayRow.data = gameData.rows[i - offsetTop];
                grid.playRows.push(newPlayRow);
            }

            this.fillGridRow(newRow, newPlayRow, rowLength, offsetLeft, isDataRow);
            grid.gridRows.push(newRow);
        }
    };

    private fillGridRow = (row:Line, playRow:Line, rowLength:number, offsetLeft:number, isDataRow:boolean):void => {
        for (var i = 0; i < rowLength; i++) {
            var newField:Field = this.fieldCtrl.createField();

            if (i < offsetLeft || isDataRow) {
                this.fieldCtrl.setDataField(newField);
            } else {
                playRow.fields.push(newField);
            }

            row.fields.push(newField);
        }
    };

    private createPlayColumns = (grid:Grid, columnData:number[][]):void => {
        for (var i = 0; i < grid.playRows[0].fields.length; i++) {
            var newLine:Line = this.lineCtrl.createLine();
            newLine.data = columnData[i];
            grid.playColumns.push(newLine);
        }
        this.fillPlayColumns(grid);
    };

    private createGridColumns = (grid:Grid, columnData:number[][], offsetLeft:number):void => {
        for (var i = 0; i < grid.gridRows[0].fields.length; i++) {
            var newLine:Line = this.lineCtrl.createLine();
            newLine.data = columnData[i - offsetLeft];
            grid.gridColumns.push(newLine);
        }
        this.fillGridColumns(grid);
    };

    private fillGridColumns = (grid:Grid):void => {
        for (var row = 0; row < grid.gridRows.length; row++) {

            for (var field = 0; field < grid.gridRows[row].fields.length; field++) {
                grid.gridColumns[field].fields[row] = grid.gridRows[row].fields[field];
            }
        }
    };

    private fillPlayColumns = (grid:Grid):void => {
        for (var row = 0; row < grid.playRows.length; row++) {

            for (var field = 0; field < grid.playRows[row].fields.length; field++) {
                grid.playColumns[field].fields[row] = grid.playRows[row].fields[field];
            }
        }
    };

    private fillDataFieldsColumns = (grid:Grid, offsetLeft:number, columnData:number[][], offsetTop:number):void => {
        for (var column = offsetLeft; column < grid.gridColumns.length; column++) {
            var colData:number[] = columnData[column - offsetLeft];

            for (var field = 0; field < offsetTop; field++) {
                grid.gridColumns[column].fields[offsetTop - field - 1].value = colData[field];
            }
        }
    };

    private fillDataFieldsRows = (grid:Grid, offsetTop:number, rowData:number[][], offsetLeft:number):void => {
        for (var row = offsetTop; row < grid.gridRows.length; row++) {
            var rData:number[] = rowData[row - offsetTop];

            for (var field = 0; field < offsetLeft; field++) {
                grid.gridRows[row].fields[offsetLeft - field - 1].value = rData[field];
            }
        }
    };
}
import {Component, Input} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';
import {IGame} from './nonogramData';
import {Grid, GridCtrl} from "./Grid.component";
import {FieldCtrl} from "./Field.component";
import {DataService} from "./DataService";
import {Inject} from "angular2/core";

@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/main.html',
    styleUrls: ['app/css/main.css'],
    directives: [NgClass, NgStyle],
    providers: [DataService],
})

export class AppComponent {
    @Input() height:number;
    @Input() width:number;
    @Input() gameMode:string[] = ['easy', 'normal', 'hard'];

    private grid:Grid;
    private offsetLeft:number;
    private offsetTop:number;
    private gameData:IGame;
    private defaultNrOfFields:number = 15;
    private minLines:number = 5;
    private maxLines:number = 100;
    private games:IGame[];
    private errorTexts:string[] = [];
    private gridCtrl:GridCtrl = new GridCtrl();
    private nrOfrandomGames:number = 0;
    private nrOfCustomGames = 0;
    private difficulty:number;
    private tempGame:IGame;

    constructor(@Inject(DataService) dataService:DataService) {
        dataService.getData().then(result => {
            this.games = result;
            this.init(this.games[0]);
        });
    }

    private init = (gameData?:IGame) => {
        this.offsetLeft = 0;
        this.offsetTop = 0;

        this.gameData = gameData || this.games[this.getGameIndex()];

        this.getOffsetLeft();
        this.getOffsetTop();

        this.grid = this.gameData.grid || this.gridCtrl.createGrid(this.gameData, this.offsetLeft, this.offsetTop);

    };

    private setErrorText = (text:string, time?:number) => {
        time = time || 3000;
        this.errorTexts.push(text);
        setTimeout(() => {
            this.errorTexts.splice(this.errorTexts.indexOf(text),1)
        }, time);
    };

    deleteGame(name:string, index:number) {
        if(name !== 'ng-nl game') {
            if (index == this.getGameIndex()) {
                this.nextGame();
                this.games.splice(index, 1);
            } else {
                this.games.splice(index, 1);
            }
        }
    }

    loadGame(index:number) {
        this.init(this.games[index]);
    }

    cancelCreateCustom = () => {
        this.tempGame = null;
        this.init(this.games[this.getGameIndex()]);
    };

    private nextGame = () => {
        if (!this.tempGame) {
            this.saveCurrentState();
        }
        this.tempGame = null;

        var gameIndex = this.games[this.getGameIndex() + 1] ? this.getGameIndex()+1 : 0;
        this.init(this.games[gameIndex]);
    };

    saveCurrentState = () => {
        this.games[this.getGameIndex()].grid = this.grid;
    };

    getGameIndex = ():number => {
        var gameIndex:number = 0;
        for(var i =0; i < this.games.length; i++) {
            if(this.games[i].name == this.grid.name) {
                gameIndex = i;
            }
        }
        return gameIndex;
    };

    private generateNew = (height:number, width:number) => {
        this.saveCurrentState();
        this.tempGame = null;

        height = this.getNewGridHeight(height);
        width = this.getNewGridWidth(width);

        var rows:number[][] = [];
        var columns:number[][] = [];
        var solutionRows:number[][] = [];
        var solutionColumns:number[][] = [];

        // Fills the rows with random positive and negative numbers.
        // The negative numbers will be the empty spaces and the positive numbers the filled spaces
        for (var i = 0; i < height; i++) {
            solutionRows[i] = this.fillRowWithNumbers(width);
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
            var randomSpace:number = Math.floor((Math.random() * height) + 1);
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

        columns = this.calcAndFillColumns(solutionColumns, columns);
        rows = this.calcAndFillRows(solutionRows, rows);

        var newGame:IGame = {
            rows: rows,
            columns: columns,
            solution: solutionRows,
            name: 'random' + ++this.nrOfrandomGames
        };

        this.games.push(newGame);
        this.init(newGame);
    };

    private getNewGridHeight = (height:number):number => {
        if (height) {
            if (height < this.minLines) {
                height = this.minLines;
                this.setErrorText('Min height is ' + this.minLines + '. Height is set to ' + this.minLines);
            } else if (height > this.maxLines) {
                height = this.maxLines;
                this.setErrorText(this.errorTexts = 'Max height is ' + this.maxLines + '. Height is set to ' + this.maxLines);
            } else if (isNaN(height)) {
                height = this.minLines;
                this.setErrorText('Input height is not a number. Height is set to ' + this.minLines);
            }
        } else {
            height = this.defaultNrOfFields;
        }
        return height;
    };

    private getNewGridWidth = (width:number):number => {
        if (width) {
            if (width < this.minLines) {
                this.setErrorText('Min width is ' + this.minLines + '. Width is set to ' + this.minLines);
                width = this.minLines;
            } else if (width > this.maxLines) {
                this.setErrorText('Max width is ' + this.maxLines + '. Width is set to ' + this.maxLines);
                width = this.maxLines;
            } else if (isNaN(width)) {
                width = this.minLines;
                this.setErrorText('Input width is not a number. Width is set to ' + this.minLines);
            }
        } else {
            width = this.defaultNrOfFields;
        }
        return width;
    };

    getDifficulty = ():number => {
        var d:number = 1.3;
        switch (this.difficulty) {

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

    private fillRowWithNumbers = (width:number):number[] => {
        var d:number = this.getDifficulty();

        var row:number[] = [];
        for (var i = 0; i < width; i++) {
            var positive:boolean = Math.floor(Math.random() * d) < 1;
            if (positive) {
                row.push(1);
            } else {
                row.push(-1);
            }
        }
        return row;
    };

    private getOffsetLeft = ():void => {
        this.gameData.rows.forEach(row => {
            if (row.length > this.offsetLeft) {
                this.offsetLeft = row.length;
            }
        });
    };

    private getOffsetTop = ():void => {
        this.gameData.columns.forEach(column => {
            if (column.length > this.offsetTop) {
                this.offsetTop = column.length;
            }
        });
    };

    private createCustom = (width:number, height:number) => {
        this.saveCurrentState();
        var rows:number[][] = [];
        var columns:number[][] = [];

        this.offsetLeft = 1;
        this.offsetTop = 1;

        height = this.getNewGridHeight(height);
        width = this.getNewGridWidth(width);

        for (var i = 0; i < height; i++) {
            var emptyRow:number[] = [];
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

        var game:IGame = {
            rows: rows,
            columns: columns,
            name: 'custom' + ++this.nrOfCustomGames
        };

        this.tempGame = game;

        this.grid = this.gridCtrl.createGrid(game, this.offsetLeft, this.offsetTop);
    };

    private saveCustom = () => {
        var solutionRows:number[][] = [];
        var solutionColumns:number[][] = [];
        var columns:number[][] = [];
        var rows:number[][] = [];

        var rowPos:number = 0;
        var somethingFilled = false;
        this.grid.playRows.forEach(row => {
            var tempRow:number[] = [];
            row.fields.forEach(field => {
                if (field.state.filled) {
                    tempRow.push(1);
                    somethingFilled = true;
                } else {
                    tempRow.push(-1);
                }
            });
            solutionRows[rowPos] = tempRow;
            rowPos++;
        });

        if (!somethingFilled) {
            this.setErrorText('Can\'t save an empty grid!', 2000);
        } else {
            // Fill solution columns
            for (var column = 0; column < this.grid.playColumns.length; column++) {
                solutionColumns[column] = [];
                for (var row = 0; row < this.grid.playRows.length; row++) {
                    solutionColumns[column][row] = solutionRows[row][column];
                }
            }

            columns = this.calcAndFillColumns(solutionColumns, columns);
            rows = this.calcAndFillRows(solutionRows, rows);

            this.tempGame.columns = columns;
            this.tempGame.rows = rows;
            this.tempGame.solution = solutionRows;
            this.games.push(this.tempGame);
            this.init(this.tempGame);
            this.tempGame = null;
        }
    };

    private calcAndFillRows = (solutionRows, rows):number[][] => {
        for (var sRow = 0; sRow < solutionRows.length; sRow++) {
            rows[sRow] = [];

            var tempPos = 0;
            for (var field = 0; field < solutionRows[sRow].length; field++) {
                if (solutionRows[sRow][field] > 0) {
                    tempPos++;
                    if (field == solutionRows[sRow].length - 1) {
                        rows[sRow].push(tempPos);
                    }
                } else {
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

    private calcAndFillColumns = (solutionColumns, columns):number[][] => {
        // Fill Columns
        for (var sColumn = 0; sColumn < solutionColumns.length; sColumn++) {
            columns[sColumn] = [];

            var tempPos:number = 0;
            for (var field = 0; field < solutionColumns[sColumn].length; field++) {
                if (solutionColumns[sColumn][field] > 0) {
                    tempPos++;
                    if (field == solutionColumns[sColumn].length - 1) {
                        columns[sColumn].push(tempPos);
                    }
                } else {
                    if (tempPos != 0) {
                        columns[sColumn].push(tempPos);
                        tempPos = 0;
                    }
                }
            }
            columns[sColumn].reverse();
        }
        return columns;
    }
}
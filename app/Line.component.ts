import {Field} from "./Field.component";
import {Component} from "angular2/core";

@Component({
    selector: 'myRow',
    template: '',
})

export interface Line {

    fields:Field[];
    data:number[];

    state: {
        'row': boolean,       // true
        'blockRow': boolean,  // false
        'correct': boolean    // false
    };
}

export class LineCtrl {

    constructor() {

    }

    public createLine():Line {
        return {
            fields: [],
            data: [],

            state: {
                'row': true,
                'blockRow': false,
                'correct': false
            }
        };
    }

    isCorrect = (line:Line):boolean => {
        var filled:number[] = [];
        var temp:number = 0;

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
    }
}
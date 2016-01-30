import {Component} from 'angular2/core';

@Component({
    selector: 'myfield',
    template: '',
})

export interface Field {
    value?:number;
    state: {
        'field': boolean,       // true
        'empty': boolean,       // true
        'filled': boolean,      // false
        'cross': boolean,       // false
        'dataField': boolean,   // false
        'blockColumn': boolean, // false
        'correct': boolean      // false
    };
    show:boolean;               // false
    solution:number;            // 0
}

export class FieldCtrl {

    constructor() {

    }

    public createField():Field {
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
    }

    public showHint = (field:Field, on:boolean):void => {
        field.show = on;
        if(!field.state.dataField) {
            if(field.solution > 0 && on) {
                this.setFilled(field);
            } else {
                this.setEmpty(field);
            }
        }
    };

    public solveSingle = (field:Field, event) => {
        if(event.ctrlKey) {
            this.showHint(field,true);
        }
    };

    public setDataField = (field:Field):void => {
        field.state.dataField = true;

        field.state.filled = false;
        field.state.empty = false;
        field.state.cross = false;
    };

    public setEmpty = (field:Field):void =>{
        field.state.empty = true;

        field.state.filled = false;
        field.state.cross = false;
    };

    public setFilled = (field:Field):void =>{
        field.state.filled = true;

        field.state.empty = false;
        field.state.cross = false;
    };

    public setCross = (field:Field):void => {
        field.state.cross = true;

        field.state.filled = false;
        field.state.empty = false;
    };

    public switch = (field:Field):void => {
        if (field.state.dataField && field.value) {
            field.state.cross = !field.state.cross;
        } else {
            if (field.state.empty) {
                this.setFilled(field);
            } else if (field.state.filled) {
                this.setCross(field);
            } else if (field.state.cross) {
                this.setEmpty(field);
            }
        }
    };
}
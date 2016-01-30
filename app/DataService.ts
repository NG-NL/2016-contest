import {Injectable} from 'angular2/core';
import {IGame, games} from "./nonogramData";

@Injectable()
export class DataService {
    public getData() {
        return Promise.resolve(games);
    }
}
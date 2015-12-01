import * as Action from './actions';
import {Irasuto} from 'node-irasutoya';

const readFileSync = global.require('fs').readFileSync as (filename: string, encoding: string) => string;

export interface StateType {
    irasutoya: Irasuto[];
}

const init: StateType = {
    irasutoya: JSON.parse(readFileSync('irasutoya.json', 'utf-8'))
};

export default function irasutoyer(state: StateType = init, action: Action.Type): StateType {
    return state;
}

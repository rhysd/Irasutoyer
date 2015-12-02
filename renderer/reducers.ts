import {Irasuto} from 'node-irasutoya';
import assign = require('object-assign');
import {Kind, ActionType} from './actions';

const readFileSync = global.require('fs').readFileSync as (filename: string, encoding: string) => string;

export interface StateType {
    irasutoya: Irasuto[];
    candidates: Irasuto[];
    search: string;
}

function init(): StateType {'use strict';
    const cached = JSON.parse(readFileSync('irasutoya.json', 'utf-8'));
    return {
        irasutoya: cached,
        candidates: cached,
        search: '',
    };
}

function searchUpdate(state: StateType, new_input: string) {'use strict';
    const next_state = assign({}, state, {search: new_input});

    if (new_input === '') {
        next_state.candidates = state.irasutoya;
        return next_state;
    }

    next_state.candidates = state.irasutoya.filter(i => i.name.indexOf(new_input) !== -1);
    return next_state;
}

export default function irasutoyer(state: StateType = init(), action: ActionType): StateType {'use strict';
    switch (action.type) {
        case Kind.Search:
            return searchUpdate(state, action.input);
        default:
            break;
    }
    return state;
}

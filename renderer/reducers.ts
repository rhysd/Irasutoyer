import {Irasuto} from 'node-irasutoya';
import assign = require('object-assign');
import {Kind, ActionType} from './actions';

const readFileSync = global.require('fs').readFileSync as (filename: string, encoding: string) => string;

const ipc: ElectronRenderer.InProcess = global.require('ipc');
const remote: ElectronRenderer.Remote = global.require('remote');

export interface StateType {
    irasutoya: Irasuto[];
    candidates: Irasuto[];
    search: string;
    now_scraping: boolean;
    scraping_error: Error;
}

function loadCache(): string {'use strict';
    try {
        const cache_path = remote.getGlobal('cache_path') as string;
        return readFileSync(cache_path, 'utf-8');
    } catch(e) {
        return null;
    }
}

function init(): StateType {'use strict';
    const contents = loadCache();
    if (contents !== null) {
        const cached = JSON.parse(contents);
        return {
            irasutoya: cached,
            candidates: cached,
            search: '',
            now_scraping: false,
            scraping_error: null,
        };
    } else {
        ipc.send('scraping:start');
        return {
            irasutoya: [] as Irasuto[],
            candidates: [] as Irasuto[],
            search: '',
            now_scraping: false,
            scraping_error: null,
        }
    }
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

function startScraping(state: StateType) {'use strict';
    const next_state = assign({}, state, {now_scraping: true});
    ipc.send('scraping:start');
    return next_state;
}

function endScraping(state: StateType) {'use strict';
    const contents = loadCache();
    if (contents === null) {
        // Give up
        return assign({}, state, {now_scraping: false});
    }

    const cached = JSON.parse(contents);
    return assign({}, state, {
        now_scraping: false,
        irasutoya: cached,
        candidates: cached,
    });
}

function setError(state: StateType, err: Error) {'use strict';
    return assign({}, state, {scraping_error: err});
}

function clearError(state: StateType) {'use strict';
    return assign({}, state, {scraping_error: null});
}

export default function irasutoyer(state: StateType = init(), action: ActionType): StateType {'use strict';
    switch (action.type) {
        case Kind.Search:
            return searchUpdate(state, action.input);
        case Kind.StartScraping:
            return startScraping(state);
        case Kind.EndScraping:
            return endScraping(state);
        case Kind.FailedScraping:
            return setError(state, action.error);
        case Kind.ClearScrapingError:
            return clearError(state);
        default:
            return state;
    }
}

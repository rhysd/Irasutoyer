import {Irasuto} from 'node-irasutoya';
import assign = require('object-assign');
import {Kind, ActionType} from './actions';

const readFileSync = global.require('fs').readFileSync as (filename: string, encoding: string) => string;

const ipc: ElectronRenderer.InProcess = global.require('ipc');
const remote: ElectronRenderer.Remote = global.require('remote');
const openExternal: (url: string) => boolean = global.require('shell').openExternal;

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
    const s: StateType = {
        irasutoya: [] as Irasuto[],
        candidates: [] as Irasuto[],
        search: '',
        now_scraping: false,
        scraping_error: null,
    };

    if (contents !== null) {
        s.irasutoya = JSON.parse(contents);
        s.candidates = s.irasutoya;
    } else {
        ipc.send('scraping:start');
        s.now_scraping = true;
    }

    return s;
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

function selectItem(state: StateType, offset: number) {'use strict';
    const c = state.candidates[offset];
    if (c) {
        openExternal(c.detail_url);
    }
    return state;
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
        case Kind.SelectItem:
            return selectItem(state, action.offset);
        default:
            return state;
    }
}

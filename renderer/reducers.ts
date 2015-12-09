import {Irasuto} from 'node-irasutoya';
import assign = require('object-assign');
import path = require('path');
import shuffle = require('shuffle-array');
import {Kind, ActionType} from './actions';

const readFileSync = global.require('fs').readFileSync as (filename: string, encoding: string) => string;

const electron = global.require('electron');
const remote = electron.remote;
const openExternal = global.require('electron').shell.openExternal;
const AppPath: string = remote.require('electron').app.getAppPath();

export interface StateType {
    irasutoya: Irasuto[];
    candidates: Irasuto[];
    search: string;
    now_scraping: boolean;
    scraping_error: Error;
}

function loadCache(): string {'use strict';
    try {
        return readFileSync(remote.getGlobal('cache_path') as string, 'utf-8');
    } catch(e) {
        try {
            return readFileSync(path.join(AppPath, 'irasutoya.json'), 'utf-8');
        } catch(e) {
            return null;
        }
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
        s.irasutoya = shuffle(JSON.parse(contents) as Irasuto[]);
        s.candidates = s.irasutoya;
    } else {
        electron.ipcRenderer.send('scraping:start');
        s.now_scraping = true;
    }

    return s;
}

function shouldSurvive(i: Irasuto, search_words: string[]) {'use strict';
    for (const s of search_words) {
        if (i.name.indexOf(s) === -1) {
            return false;
        }
    }
    return true;
}

function searchUpdate(state: StateType, new_input: string) {'use strict';
    new_input = new_input.trim();
    if (state.search === new_input) {
        return state;
    }

    const next_state = assign({}, state, {search: new_input});

    if (new_input === '') {
        next_state.candidates = state.irasutoya;
        return next_state;
    }

    const words = new_input.split(/\s+/);
    next_state.candidates = state.irasutoya.filter(i => shouldSurvive(i, words));
    return next_state;
}

function startScraping(state: StateType) {'use strict';
    const next_state = assign({}, state, {now_scraping: true});
    electron.ipcRenderer.send('scraping:start');
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
    return assign({}, state, {scraping_error: err, now_scraping: false});
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

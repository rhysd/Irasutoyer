export enum Kind {
    Search,
    StartScraping,
    EndScraping,
}

export interface ActionType {
    type: Kind;
    input?: string;
}

export function search(input: string) { 'use strict';
    return {
        type: Kind.Search,
        input,
    };
}

export function startScraping() { 'use strict';
    return {
        type: Kind.StartScraping
    };
}

export function endScraping() { 'use strict';
    return {
        type: Kind.EndScraping
    };
}

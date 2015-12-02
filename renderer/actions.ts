export enum Kind {
    Search,
    StartScraping,
    EndScraping,
    FailedScraping,
    ClearScrapingError,
}

export interface ActionType {
    type: Kind;
    input?: string;
    error?: Error;
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

export function failedScraping(error: Error) { 'use strict';
    return {
        type: Kind.FailedScraping,
        error
    };
}

export function clearScrapingError() { 'use strict';
    return {
        type: Kind.ClearScrapingError
    };
}


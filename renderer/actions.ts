export enum Kind {
    Search,
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

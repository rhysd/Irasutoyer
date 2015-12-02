/// <reference path="../typings/tsd.d.ts" />

declare module NodeJS {
    interface Global {
        cache_path: string;
    }
}

interface ArrayConstructor {
    from<I>(iterable: I): any[];
}

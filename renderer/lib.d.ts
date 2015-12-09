/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/github-electron.d.ts" />
/// <reference path="./react-infinite.d.ts" />
/// <reference path="./shuffle-array.d.ts" />

declare module NodeJS {
    interface Global {
        require: NodeRequireFunction;
    }
}

interface String {
    startsWith(str: string): boolean;
}

declare module "react-tap-event-plugin" {
    function injectTapEventPlugin(): void;
    export = injectTapEventPlugin;
}



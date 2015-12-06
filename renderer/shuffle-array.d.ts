declare module "shuffle-array" {
    interface ShuffleOption {
        copy: boolean;
        rng: () => number;
    }
    interface PickOption {
        picks: number;
        rng: () => number;
    }
    interface ShuffleArray {
        pick<T>(arr: T[], options?: Object): T[];
        <T>(arr: T[], options?: ShuffleOption): T[];
    }
    var shuffle: ShuffleArray;
    export = shuffle;
}


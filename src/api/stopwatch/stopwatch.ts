export const StopWatchStateOptions: any = {
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    PAUSED: "PAUSED",
}

export type StopWatchPerformState = "RUNNING" | 'PAUSED' | "STOPPED";

export interface StopwatchCallback {
    (current: number, total: number, stopWatch: StopWatch): boolean;
}

export interface IStopWatch {
    start(): boolean;
    stop(): boolean;
    pause(): boolean;
    resume(): boolean;
    finish(): void;
    getState(): StopWatchPerformState;
}

export class StopWatch implements IStopWatch {
    #callback: StopwatchCallback;
    #current: number;
    #total: number;
    #isReset: boolean;
    #state: StopWatchPerformState;
    #id: any;
    constructor() {
        this.#current = 0;
        this.#total = 0;
        this.#isReset = false;
        this.#state = StopWatchStateOptions.STOPPED;
        this.#id = undefined;
    }

    onTick(callback: StopwatchCallback) {
        this.#callback = callback;
    }

    tick() {
        this.#id = setTimeout(() => {
            try {
                if (this.#state === StopWatchStateOptions.RUNNING && this.#callback(this.#current, this.#total, this)) {
                    if (this.#isReset) {
                        this.#current = 0;
                        this.#isReset = false;
                    } else {
                        this.#current += 1;
                        this.#total += 1;
                    }
                    this.tick();
                } else if (this.#state !== StopWatchStateOptions.PAUSED) {
                    this.stop();
                }
            } catch (e) {
                console.error("An error occured on stopwatch tick")
                console.error(e)
                this.stop();
            }
        }, 1000)
    }

    reset() {
        this.#isReset = true;
    }

    start(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            return false;
        }
        this.#current = 0;
        this.#state = StopWatchStateOptions.RUNNING;
        this.tick();
        return true;
    }

    stop(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            this.finish();
            this.#state = StopWatchStateOptions.STOPPED;
            return true;
        }
        return false;
    }

    pause(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            this.#state = StopWatchStateOptions.PAUSED;
            return true
        }
        return false;
    }

    resume() {
        if (this.#state === StopWatchStateOptions.PAUSED) {
            this.#state = StopWatchStateOptions.RUNNING;
            this.tick();
            return true;
        }
        return false;
    }

    finish(): void {
        if (this.#id) {
            clearTimeout(this.#id);
            this.#id = undefined;
        }
        this.#current = 0;
        this.#total = 0;
    }
    getState() {
        return this.#state;
    }
}
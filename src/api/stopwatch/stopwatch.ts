export const StopWatchStateOptions: any = {
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    PAUSED: "PAUSED",
}

export type StopWatchState = "RUNNING" | 'PAUSED' | "STOPPED";

export interface StopwatchCallback {
    (current: number, stopWatch: StopWatch): boolean;
}

export interface IStopWatch {
    start(): boolean;
    stop(): boolean;
    pause(): boolean;
    resume(): boolean;
    getState(): StopWatchState;
}

export class StopWatch implements IStopWatch {
    #callback: StopwatchCallback;
    current: number;
    #isReset: boolean;
    #state: StopWatchState;
    constructor() {
        this.current = 0;
        this.#isReset = false;
        this.#state = StopWatchStateOptions.STOPPED;
    }

    onTick(callback: StopwatchCallback) {
        this.#callback = callback;
    }

    tick() {
        setTimeout(() => {
            try {
                if (this.#state === StopWatchStateOptions.RUNNING && this.#callback(this.current, this)) {
                    console.log("tick");
                    if (this.#isReset) {
                        this.current = 0;
                        this.#isReset = false;
                    } else {
                        this.current += 1;
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

    tickCallback() {
        try {
            if (this.#state === StopWatchStateOptions.RUNNING && this.#callback(this.current, this)) {
                console.log("tick");
                if (this.#isReset) {
                    this.current = 0;
                    this.#isReset = false;
                } else {
                    this.current += 1;
                }

                //  this.tick();
            } else if (this.#state !== StopWatchStateOptions.PAUSED) {
                this.stop();
            }
        } catch (e) {
            console.error("An error occured on stopwatch tick")
            console.error(e)
            this.stop();
        }
    }

    reset() {
        this.#isReset = true;
    }

    start(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            return false;
        }
        console.log("Starting stopwatch")
        this.current = 0;
        this.#state = StopWatchStateOptions.RUNNING;
        this.tick();
        return true;
    }

    stop(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            console.log("Stopping stopwatch")
            this.#state = StopWatchStateOptions.STOPPED;
            return true;
        }
        return false;
    }

    pause(): boolean {
        if (this.#state === StopWatchStateOptions.RUNNING) {
            console.log("Pausing stopwatch")
            this.#state = StopWatchStateOptions.PAUSED;
            return true
        }
        return false;
    }

    resume() {
        if (this.#state === StopWatchStateOptions.PAUSED) {
            console.log("Resuming stopwatch")
            this.#state = StopWatchStateOptions.RUNNING;
            this.tick();
            return true;
        }
        return false;
    }

    getState() {
        return this.#state;
    }
}
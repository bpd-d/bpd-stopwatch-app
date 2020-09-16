export interface TestApiCallback {
    (value: number): boolean;
}
export class TestApi {
    #callback: TestApiCallback;
    constructor() {

    }

    setCallback(callback: TestApiCallback) {
        this.#callback = callback;
    }

    execute() {
        this.#callback(10)
    }
}
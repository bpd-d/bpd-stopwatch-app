interface KeepScreenToggle {
    activate(): void;
    release(): void;
}

export class KeepAwakeToggle implements KeepScreenToggle {
    #screen: any;
    constructor() {
        this.#screen = screen;
    }

    activate() {
        this.#screen.keepAwake = true;
    }

    release(): void {
        this.#screen.keepAwake = false;
    }

}

export class WakeLockScreen implements KeepScreenToggle {
    wakeLockRequest: any;

    activate() {
        let nav = navigator as any;
        nav.wakeLock.request('screen').then((wakelock: any) => {
            this.wakeLockRequest = wakelock;
            console.log("Wakelock activated");
        })
    }

    release() {
        if (this.wakeLockRequest) {
            this.wakeLockRequest.release();
            this.wakeLockRequest = null;
            console.log("Wakelock deactivated");
        }
    }
}

export class KeepScreenAwakeFeature {
    #toggle: KeepScreenToggle;

    constructor() {
        this.#toggle = this.getToggle();
    }
    activate() {
        this.#toggle.activate();
    }
    release() {
        this.#toggle.release();
    }
    private getToggle() {
        if ('keepAwake' in screen) {
            return new KeepAwakeToggle();
        } else {
            return new WakeLockScreen();
        }
    }
}
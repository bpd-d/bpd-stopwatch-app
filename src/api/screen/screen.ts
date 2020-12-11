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

export class LoopLockScreen implements KeepScreenToggle {
    element: Element | undefined;

    constructor() {
        this.element = undefined;
    }

    activate(): void {
        if (this.element) {
            return;
        }
        this.element = this.createElement("/static/video/Screen.mp4");
        document.body.appendChild(this.element);
    }

    release(): void {
        if (!this.element) {
            return;
        }
        this.element.remove();
        this.element = undefined;
    }

    private createElement(src: string): Element {
        let newEl = document.createElement("video");
        newEl.autoplay = true;
        newEl.muted = true;
        newEl.src = src;
        newEl.loop = true;

        newEl.classList.add('loop-screen')
        newEl.textContent = "Not Supported";
        return newEl;
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
            return new LoopLockScreen();
            //return new WakeLockScreen();
        }
    }
}
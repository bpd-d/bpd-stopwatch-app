export class KeepScreenAwake {
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
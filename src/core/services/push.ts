import { IPushService } from "./interfaces";

export class PushService implements IPushService {
    constructor() {

    }

    setNavbarTitle(title: string): string {
        return title ?? "";
    }
}
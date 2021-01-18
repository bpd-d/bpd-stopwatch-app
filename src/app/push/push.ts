import { IPushService } from "src/core/services/interfaces";

export const PUSH_ACTIONS = {
    SET_NAVBAR_TITLE: "SET_NAVBAR_TITLE",
    SET_NAVBAR_BG: "SET_NAVBAR_BG",
}

export type PushServiceInput = string;
export type PushServiceOutput = string;


export class PushServiceFlow {
    #service: IPushService;
    constructor(service: IPushService) {
        this.#service = service;
    }

    getActions() {
        return {
            [PUSH_ACTIONS.SET_NAVBAR_TITLE]: (title: string) => {
                return this.#service.setNavbarTitle(title);
            },
            [PUSH_ACTIONS.SET_NAVBAR_BG]: (bg: string) => {
                return bg;
            }
        }
    }
}
import { Settings } from "../../core/models";
import { ISettingsService } from "../../core/services/interfaces";


export const SETTINGS_FLOW_ACTIONS = {
    GET_DARK_MODE: "GET_DARK_MODE",
    SET_DARK_MODE: "SET_DARK_MODE",
    GET_SOUND_ENABLED: "GET_SOUND_ENABLED",
    SET_SOUND_ENABLED: "SET_SOUND_ENABLED",
    SET_SETTINGS: "SET_SETTINGS",
    GET_SETTINGS: "GET_SETTINGS",
    GET_IS_WELCOME: "GET_IS_WELCOME",
    SET_IS_WELCOME: "SET_IS_WELCOME",
    GET_SIMPLE_VIEW: "GET_SIMPLE_VIEW",
    CLEAR_SETTINGS: "CLEAR_SETTINGS"
}

export type SettingsFlowInput = Settings | boolean;
export type SettingsFlowOutput = boolean | void | Settings;

export class SettingsFlow {
    #service: ISettingsService;
    constructor(service: ISettingsService) {
        this.#service = service;
    }
    getActions() {
        return {
            [SETTINGS_FLOW_ACTIONS.GET_SOUND_ENABLED]: () => {
                return this.#service.isSoundEnabled();
            },
            [SETTINGS_FLOW_ACTIONS.SET_SOUND_ENABLED]: (flag: boolean) => {
                this.#service.setSoundEnabled(flag);
            },
            [SETTINGS_FLOW_ACTIONS.GET_DARK_MODE]: () => {
                return this.#service.isDarkMode();
            },
            [SETTINGS_FLOW_ACTIONS.SET_DARK_MODE]: (flag: boolean) => {
                this.#service.setDarkMode(flag);
            },
            [SETTINGS_FLOW_ACTIONS.SET_SETTINGS]: (value: Settings) => {
                this.#service.setSettings(value);
            },
            [SETTINGS_FLOW_ACTIONS.GET_SETTINGS]: () => {
                return this.#service.getSettings();
            },
            [SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME]: () => {
                return this.#service.isWelcomeSet();
            },
            [SETTINGS_FLOW_ACTIONS.GET_SIMPLE_VIEW]: () => {
                let sett = this.#service.getSettings();
                return sett.simpleView;
            },
            [SETTINGS_FLOW_ACTIONS.SET_IS_WELCOME]: (flag: boolean) => {
                this.#service.setIsWelcome(flag);
            },
            [SETTINGS_FLOW_ACTIONS.CLEAR_SETTINGS]: () => {
                this.#service.clearSettings();
                return true;
            }
        }
    }
}
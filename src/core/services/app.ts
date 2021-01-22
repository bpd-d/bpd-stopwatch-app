import { AppSettings } from "../models";
import { IAppSettingsService } from "./interfaces";

export class AppSettingsService implements IAppSettingsService {
    #settings: AppSettings;
    constructor(settings: AppSettings) {
        this.#settings = settings;
    }
    
    getSettings(): AppSettings {
        return this.#settings;
    }

}
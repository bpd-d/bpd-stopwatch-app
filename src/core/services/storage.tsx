import { ITrainingsService, IActionsService, ISettingsService } from "./interfaces";
import { Training, StopwatchAction, Settings } from "../models";
import { BpdStorage } from "../../../node_modules/bpd-storage/dist/index";
import { ActionValidator, TrainingValidator } from "../validators";
import { is } from "bpd-toolkit/dist/esm/index";

export class TrainingsStorageService implements ITrainingsService {
    #storage: BpdStorage;
    #trainings: Training[];
    #STORAGE_NAME: string;
    #validator: TrainingValidator;
    constructor() {
        this.#storage = new BpdStorage("local", "BPD_TRAININGS");
        this.#STORAGE_NAME = "Trainings";
        this.#trainings = [];
        this.#validator = new TrainingValidator();
    }

    getAllTrainings(): Training[] {
        return this.getTrainings();
    }

    addTraining(training: Training): boolean {
        let result = false;
        if (this.validate(training)) {
            this.onAction((t: Training[]) => {
                let len = t.length
                if (!training.id) {
                    training.id = len > 0 ? t[len - 1].id + 1 : 0;
                    t.push(training)
                    result = true;
                    return t;
                }
                return null;
            })
        }

        return result;
    }

    updateTraining(training: Training): boolean {
        let result = false;
        if (this.validate(training)) {
            if (!training.id || training.id < 0) {
                result = this.addTraining(training)
            } else {
                this.onAction((t: Training[]) => {
                    let idx = t.findIndex(item => item.id === training.id);
                    if (idx > -1) {
                        t[idx] = training;
                        result = true;
                        return t;
                    }
                    return null;
                })
            }
        }
        return result;
    }

    /**
     * Removes training from storage
     * @param id Id of training
     */
    deleteTraining(id: number): boolean {
        let result = false;
        if (id < 0) {
            return false;
        }
        this.onAction((t: Training[]) => {
            let idx = t.findIndex(item => item.id === id);
            if (idx > -1) {
                t.splice(idx, 1);
                result = true;
                return t;
            }
            return null;
        })
        return result;
    }

    getTraining(id: number): Training {
        let training = undefined;
        this.onAction((t) => {
            training = t.find(item => { return item.id == id });
            return null;
        })
        return training;
    }

    /**
     * Removes all trainings from storage
     */
    clearTrainings(): void {
        this.onAction((trainings: Training[]) => {
            return [];
        })
    }

    getCurrentTraining(): Training {
        throw new Error("Method not implemented.");
    }

    setCurrentTraining(training: Training): void {
        throw new Error("Method not implemented.");
    }

    private getTrainings(): Training[] {
        if (this.#trainings.length === 0) {
            let res = this.#storage.getAny(this.#STORAGE_NAME);
            this.#trainings = res ?? [];
        }
        return this.#storage.getAny(this.#STORAGE_NAME) ?? [];
    }

    private setTrainings(t: Training[]): void {
        this.#storage.setAny(this.#STORAGE_NAME, t);
    }


    private validate(training: Training): boolean {
        return this.#validator.validate(training).status;
    }

    private onAction(callback: (t: Training[]) => Training[] | null) {
        let t = this.getTrainings();
        let result = callback(t)
        if (result !== null) {
            this.setTrainings(result);
        }
    }
}

export class ActionStorageService implements IActionsService {
    #storage: BpdStorage;
    #actions: StopwatchAction[];
    #validator: ActionValidator;
    constructor() {
        this.#storage = new BpdStorage("local", "BPD_TRAININGS");
        this.#actions = [];
        this.#validator = new ActionValidator();
        this.getActionsFromStorage();
    }

    getAllActions(): StopwatchAction[] {
        return [...this.#actions];
    }

    setAction(action: StopwatchAction): boolean {
        if (!this.#validator.validate(action).status) {
            return false;
        }
        if (!is(action.id)) {
            action.id = "000" + this.getNextIndex();
            this.#actions.push(action);
        }
        let existingIndex = this.getIndex(action);
        if (existingIndex > -1) {
            this.#actions[existingIndex] = action;
            this.setActionsToStorage();
            return true;
        }
        console.log("Unknown action id: " + action.id);
        return false;
    }

    removeAction(action: StopwatchAction): boolean {
        if (!this.#validator.validate(action).status) {
            return false;
        }
        let existingIndex = this.getIndex(action);
        if (existingIndex < 0) {
            console.log("Unknown action id: " + action.id);
            return false;
        }
        this.#actions.splice(existingIndex, 1);
        this.setActionsToStorage();
        return true;
    }

    clearActions(): void {
        this.#actions = [];
        this.setActionsToStorage();
    }

    getActionsById(...id: string[]): StopwatchAction[] | undefined {
        if (!is(id)) {
            return undefined;
        }
        return this.#actions.reduce((result: StopwatchAction[], action: StopwatchAction, index: number) => {
            if (id.includes(action.id)) {
                result.push(action);
            }
            return result;
        }, []);
    }

    private getIndex(action: StopwatchAction): number {
        return this.#actions.findIndex(item => item.id === action.id);
    }

    private getActionsFromStorage() {
        let val = this.#storage.getAny("ACTIONS");
        this.#actions = val ?? [];
    }

    private setActionsToStorage() {
        this.#storage.setAny("ACTIONS", this.#actions);
    }

    private getNextIndex() {
        let item = this.#storage.getNumber("ACTION_INDEX");
        if (!item) {
            item = 5;
        } else {
            item = item + 1;
        }
        this.#storage.setNumber("ACTION_INDEX", item);
        return item;
    }

}

export class SettingsService implements ISettingsService {
    #storage: BpdStorage;
    constructor() {
        this.#storage = new BpdStorage("local", "BPD_SETTINGS");

    }


    setSettings(value: Settings): boolean {
        this.#storage.setAny("SETTINGS", value);
        return true;
    }

    getSettings(): Settings {
        return this.#storage.getAny("SETTINGS") || {
            darkMode: false,
            soundEnabled: false
        };
    }

    setSoundEnabled(flag: boolean): void {
        let settings = this.getSettings();
        if (flag !== settings.soundEnabled) {
            settings.soundEnabled = flag;
            this.setSettings(settings)
        }
    }

    isSoundEnabled(): boolean {
        return this.getSettings()?.soundEnabled;
    }

    setDarkMode(flag: boolean): void {
        let settings = this.getSettings();
        if (flag !== settings.darkMode) {
            settings.darkMode = flag;
            this.setSettings(settings)
        }
    }

    isDarkMode(): boolean {
        return this.getSettings()?.darkMode;
    }

    isWelcomeSet(): boolean {
        return this.getSettings()?.isWelcome;
    }

    setIsWelcome(flag: boolean) {
        let settings = this.getSettings();
        if (flag !== settings.isWelcome) {
            settings.isWelcome = flag;
            this.setSettings(settings)
        }
    }

    clearSettings(): void {
        this.setSettings({
            darkMode: false,
            soundEnabled: false,
            isWelcome: false
        })
    }
}
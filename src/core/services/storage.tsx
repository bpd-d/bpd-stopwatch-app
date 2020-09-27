import { ITrainingsService, IActionsService, ISettingsService } from "./interfaces";
import { Training, StopwatchAction, Settings } from "../models";
import { BpdStorage } from "../../../node_modules/bpd-storage/dist/index";
import { ActionValidator, TrainingValidator } from "../validators";

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
        console.log("Get All")
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
                }
                return result;
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
                    }
                    return result;
                })
            }
        }
        return result;
    }

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
            }
            return result;
        })
        return result;
    }

    getTraining(id: number): Training {
        let training = undefined;
        this.onAction((t) => {
            training = t.find(item => { return item.id == id });
            return false;
        })
        return training;
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

    private onAction(callback: (t: Training[]) => boolean) {
        let t = this.getTrainings();
        if (callback(t)) {
            console.log(t)
            this.setTrainings(t);
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
        let existingIndex = this.getIndex(action);
        if (existingIndex > -1) {
            this.#actions[existingIndex] = action;
        } else {
            this.#actions.push(action)
        }
        this.setActionsToStorage();
        return true;
    }

    removeAction(action: StopwatchAction): boolean {
        if (!this.#validator.validate(action).status) {
            return false;
        }

        let existingIndex = this.getIndex(action);
        if (existingIndex < 0) {
            return false;
        }
        this.#actions.splice(existingIndex, 1);
        this.setActionsToStorage();
        return true;

    }

    private getIndex(action: StopwatchAction): number {
        return this.#actions.findIndex(item => item.name === action.name);
    }
    private getActionsFromStorage() {
        let val = this.#storage.getAny("ACTIONS");
        this.#actions = val ?? [];
    }

    private setActionsToStorage() {
        this.#storage.setAny("ACTIONS", this.#actions);
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
}
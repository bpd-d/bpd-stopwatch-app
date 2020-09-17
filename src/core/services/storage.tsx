import { ITrainingsService, IActionsService } from "./interfaces";
import { Training, StopwatchAction } from "../models";
import { BpdStorage } from "../../../node_modules/bpd-storage/dist/index";
import { validateStopwatchAction } from "../helpers";
import { TaskedEventEmitHandler } from "../../../node_modules/cui-light/dist/index";

export class TrainingsStorageService implements ITrainingsService {
    #storage: BpdStorage;
    #trainings: Training[];
    #STORAGE_NAME: string;
    constructor() {
        this.#storage = new BpdStorage("local", "BPD_TRAININGS");
        this.#STORAGE_NAME = "Trainings";
        this.#trainings = [];
    }


    getAllTrainings(): Training[] {
        console.log("Get All")
        return this.getTrainings();
    }

    addTraining(training: Training): boolean {
        let result = false;
        if (this.validate(training)) {
            console.log("Add valid")
            this.onAction((t: Training[]) => {
                console.log("Add on Action")
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
        return this.#trainings
    }

    private setTrainings(): void {
        this.#storage.setAny(this.#STORAGE_NAME, this.#trainings);
    }

    private validate(training: Training): boolean {
        return training && training.name && training.name.length > 0;
    }

    private onAction(callback: (t: Training[]) => boolean) {
        let t = this.getTrainings();
        if (callback(t)) {
            this.setTrainings();
        }
    }
}

export class ActionStorageService implements IActionsService {
    #storage: BpdStorage;
    #actions: StopwatchAction[];
    constructor() {
        this.#storage = new BpdStorage("local", "BPD_TRAININGS");
        this.getActionsFromStorage();
    }
    getAllActions(): StopwatchAction[] {
        return [...this.#actions];
    }

    setAction(action: StopwatchAction): boolean {
        if (!validateStopwatchAction(action)) {
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
        if (!validateStopwatchAction(action)) {
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
        this.#actions = val;
    }

    private setActionsToStorage() {
        this.#storage.setAny("ACTIONS", this.#actions);
    }
}
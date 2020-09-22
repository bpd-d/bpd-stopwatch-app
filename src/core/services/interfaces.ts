import { Training, StopwatchAction, Settings } from "../models";

export interface ITrainingsService {
    getAllTrainings(): Training[];
    addTraining(training: Training): boolean;
    updateTraining(training: Training): boolean;
    deleteTraining(id: number): boolean;
    getCurrentTraining(): Training;
    setCurrentTraining(training: Training): void;
    getTraining(id: number): Training;
}

export interface IActionsService {
    getAllActions(): StopwatchAction[];
    setAction(action: StopwatchAction): boolean;
    removeAction(action: StopwatchAction): boolean;
}

export interface ISettingsService {
    setSoundEnabled(flag: boolean): void;
    isSoundEnabled(): boolean;
    setDarkMode(flag: boolean): void;
    isDarkMode(): boolean;
    setSettings(value: Settings): boolean;
    getSettings(): Settings;
}
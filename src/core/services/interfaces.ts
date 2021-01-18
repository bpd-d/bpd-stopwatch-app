import { Training, StopwatchAction, Settings } from "../models";

export interface ITrainingsService {
    getAllTrainings(): Training[];
    addTraining(training: Training): boolean;
    updateTraining(training: Training): boolean;
    deleteTraining(id: string): boolean;
    getCurrentTraining(): Training;
    setCurrentTraining(training: Training): void;
    getTraining(id: string): Training;
    isDraft(): boolean;
    getDraft(): Training | undefined;
    setDraft(training: Training): void;
    clearDraft(): void;
    clearTrainings(): void;
}

export interface IActionsService {
    getAllActions(): StopwatchAction[];
    setAction(action: StopwatchAction): boolean;
    removeAction(action: StopwatchAction): boolean;
    getActionsById(...id: string[]): StopwatchAction[] | undefined;
    clearActions(): void;
}

export interface ISettingsService {
    setSoundEnabled(flag: boolean): void;
    isSoundEnabled(): boolean;
    setDarkMode(flag: boolean): void;
    isDarkMode(): boolean;
    isWelcomeSet(): boolean;
    setIsWelcome(flag: boolean): void;
    setSettings(value: Settings): boolean;
    getSettings(): Settings;
    clearSettings(): void;
}

export interface IPushService {
    setNavbarTitle(title: string): string;
}
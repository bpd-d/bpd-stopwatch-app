import { Training, StopwatchAction } from "../models";

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
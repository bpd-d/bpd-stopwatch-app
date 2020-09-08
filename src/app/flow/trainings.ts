import { Training } from "../../core/models";
import { ITrainingsService } from "../../core/services/interfaces";

export const ACTIONS = {
    GET_ALL_TRAININGS: "GET_ALL_TRAININGS",
    ADD_TRAINING: "ADD_TRAINING"
}

export type TrainingsFlowInput = void | Training | number;
export type TrainingsFlowOutput = Training[] | Training | boolean;

export class TrainingsFlow {
    #service: ITrainingsService;
    constructor(service: ITrainingsService) {
        this.#service = service;
    }

    getActions() {
        return {
            "GET_ALL_TRAININGS": () => {
                return this.#service.getAllTrainings();
            },
            "ADD_TRAINING": (t: Training) => {
                return this.#service.addTraining(t);
            },
            "UPDATE_TRAINING": (t: Training) => {
                return this.#service.updateTraining(t);
            },
            "DELETE_TRAINING": (id: number) => {
                return this.#service.deleteTraining(id);
            },
            "GET_TRAINING": (id: number) => {
                return this.#service.getTraining(id);
            },
        }
    }
}
import { Training } from "../../core/models";
import { ITrainingsService } from "../../core/services/interfaces";

export const ACTIONS = {
    GET_ALL_TRAININGS: "GET_ALL_TRAININGS",
    ADD_TRAINING: "ADD_TRAINING",
    UPDATE_TRAINING: "UPDATE_TRAINING",
    DELETE_TRAINING: "DELETE_TRAINING",
    GET_TRAINING: "GET_TRAINING",
    CLEAR_TRAININGS: "CLEAR_TRAININGS"

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
            [ACTIONS.GET_ALL_TRAININGS]: () => {
                return this.#service.getAllTrainings();
            },
            [ACTIONS.ADD_TRAINING]: (t: Training) => {
                return this.#service.addTraining(t);
            },
            [ACTIONS.UPDATE_TRAINING]: (t: Training) => {
                return this.#service.updateTraining(t);
            },
            [ACTIONS.DELETE_TRAINING]: (id: number) => {
                return this.#service.deleteTraining(id);
            },
            [ACTIONS.GET_TRAINING]: (id: number) => {
                return this.#service.getTraining(id);
            },
            [ACTIONS.CLEAR_TRAININGS]: () => {
                this.#service.clearTrainings();
                return true;
            },
        }
    }
}
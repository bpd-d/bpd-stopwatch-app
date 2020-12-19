import { is } from "bpd-toolkit/dist/esm/index";
import { Training } from "../../core/models";
import { ITrainingsService } from "../../core/services/interfaces";

export const ACTIONS = {
    GET_ALL_TRAININGS: "GET_ALL_TRAININGS",
    ADD_TRAINING: "ADD_TRAINING",
    UPDATE_TRAINING: "UPDATE_TRAINING",
    DELETE_TRAINING: "DELETE_TRAINING",
    GET_TRAINING: "GET_TRAINING",
    CLEAR_TRAININGS: "CLEAR_TRAININGS",
    GET_DRAFT: "GET_DRAFT",
    SET_DRAFT: "SET_DRAFT",
    CLEAR_DRAFT: "CLEAR_DRAFT",
    GET_FOR_EDIT: "GET_FOR_EDIT"
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
            [ACTIONS.DELETE_TRAINING]: (id: string) => {
                return this.#service.deleteTraining(id);
            },
            [ACTIONS.GET_TRAINING]: (id: string) => {
                return this.#service.getTraining(id);
            },
            [ACTIONS.GET_DRAFT]: () => {
                return this.#service.getDraft();
            },
            [ACTIONS.SET_DRAFT]: (training: Training) => {
                return this.#service.setDraft(training);
            },
            [ACTIONS.CLEAR_DRAFT]: () => {
                return this.#service.clearDraft();
            },
            [ACTIONS.GET_FOR_EDIT]: (id: string) => {
                let draft = this.#service.getDraft();
                if (is(draft) && draft.id === id) {
                    return draft;
                }
                if (!is(id) && is(draft.id)) {
                    return undefined;
                }
                return this.#service.getTraining(id);
            },
            [ACTIONS.CLEAR_TRAININGS]: () => {
                this.#service.clearTrainings();
                return true;
            },
        }
    }
}
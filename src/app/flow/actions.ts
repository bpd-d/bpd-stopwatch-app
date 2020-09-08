import { IActionsService } from "../../core/services/interfaces"
import { StopwatchAction } from "../../core/models";

export const ACTIONS_FLOW_ACTIONS = {
    GET_ALL: "GET_ALL",
    SET_ACTION: "SET_ACTION",
    REMOVE_ACTION: "REMOVE_ACTION"
}

export type ActionsFlowInput = StopwatchAction;
export type ActionsFlowOutput = boolean | StopwatchAction[];

export class ActionsFlow {
    #service: IActionsService;
    constructor(service: IActionsService) {
        this.#service = service;
    }
    getActions() {
        return {
            [ACTIONS_FLOW_ACTIONS.GET_ALL]: () => {
                return this.#service.getAllActions();
            },
            [ACTIONS_FLOW_ACTIONS.SET_ACTION]: (action: StopwatchAction) => {
                return this.#service.setAction(action);
            },
            [ACTIONS_FLOW_ACTIONS.REMOVE_ACTION]: (action: StopwatchAction) => {
                return this.#service.removeAction(action);
            }
        }
    }
}
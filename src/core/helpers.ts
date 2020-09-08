import { StopwatchActionType, StopwatchAction } from "./models";

export function validateStopwatchAction(action: StopwatchAction): boolean {
    if (!action || !action.name || !action.duration || !action.type) {
        return false;
    }
    return true;
}
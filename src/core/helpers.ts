import { StopwatchActionType, StopwatchAction, Training } from "./models";

export function validateStopwatchAction(action: StopwatchAction): boolean {
    if (!action || !action.name || !action.duration || !action.type) {
        return false;
    }
    return true;
}

export function validateTraining(training: Training) {
    return training && training.name && training.name !== "";
}

export function showMessage(title: string, message: string) {
    window.$cui.alert("common-info-dialog", "Info", {
        title: title,
        message: message
    })
}

export function calculateDuration(actions: StopwatchAction[]) {
    return actions && actions.length > 0 ? actions.reduce<number>((result: number, value: StopwatchAction) => {
        return result + value.duration;
    }, 0) : 0
}
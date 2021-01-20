import { Settings, StopwatchAction, StopwatchActionType } from "./models";

export const DefaultActions: StopwatchAction[] = [{
    id: "9996",
    name: "Warmup",
    duration: "5",
    type: StopwatchActionType.WARMUP,
    removable: false,
    editable: false
},
{
    id: "9997",
    name: "Exercise",
    duration: "30",
    type: StopwatchActionType.EXERCISE,
    removable: false,
    editable: false
},
{
    id: "9998",
    name: "Break",
    duration: "60",
    type: StopwatchActionType.BREAK,
    removable: false,
    editable: false
},
{
    id: "9999",
    name: "Cooldown",
    duration: "90",
    type: StopwatchActionType.COOLDOWN,
    removable: false,
    editable: false
}]

export const ERROR_CODES = {
    e0000: "OK",
    e0001: "An error occured",
    e0100: "Training is empty",
    e0101: "Training name is not provided",
    e0102: "Training has no rounds",
    e0200: "Round is empty",
    e0201: "Round has no actions",
    e0202: "Round name is missing",
    e0300: "Action is empty",
    e0301: "Action name is not provided",
    e0302: "Action type is not provided",
    e0303: "Action duration is not correct"

}

export function getDefaultRoundName(index: number) {
    return "Round " + index;
}

export const DefaultSettings: Settings = {
    darkMode: false,
    soundEnabled: false,
    isWelcome: false,
    simpleView: false
}

export const APP_NAME = "bpd Stopwatch"
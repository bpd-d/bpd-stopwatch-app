import { StopwatchAction, StopwatchActionType } from "./models";

export const DefaultActions: StopwatchAction[] = [{
    name: "Warmup",
    duration: 5,
    type: StopwatchActionType.WARMUP,
    removable: false,
    editable: false
},
{
    name: "Exercise",
    duration: 30,
    type: StopwatchActionType.EXERCISE,
    removable: false,
    editable: false
},
{
    name: "Break",
    duration: 60,
    type: StopwatchActionType.BREAK,
    removable: false,
    editable: false
},
{
    name: "Cooldown",
    duration: 90,
    type: StopwatchActionType.WARMUP,
    removable: false,
    editable: false
}]

export const ERROR_CODES = {
    e0000: "OK",
    e0100: "Training is empty",
    e0101: "Training name is not provided",
    e0102: "Training has no rounds",
    e0200: "Round is empty",
    e0201: "Round has no actions",
    e0300: "Action is empty",
    e0301: "Action name is not provided",
    e0302: "Action type is not provided",
    e0303: "Action duration is not correct"

}
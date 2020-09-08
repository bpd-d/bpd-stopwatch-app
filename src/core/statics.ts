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
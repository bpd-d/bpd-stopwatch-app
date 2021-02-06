import { StopwatchState } from "../interfaces";


export const COUNTDOWN_TYPES = ['simple', 'circle', "test", "extended"];

export interface CountDownTimerProps {
    watchState: StopwatchState;
}
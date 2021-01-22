import { StopwatchState } from "../PerformTraining";

export const COUNTDOWN_TYPES = ['simple', 'circle', "test"];

export interface CountDownTimerProps {
    watchState: StopwatchState;
}
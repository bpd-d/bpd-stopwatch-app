import { StopWatchPerformState } from "src/api/stopwatch/stopwatch";
import { Round, StopwatchAction, Training } from "src/core/models";

export interface TimeStateData {
    time: number;
    progress: number;
    ct?: number;
    total: number;
}

export interface PerfromTrainingState {
    training: Training;
}

export interface StopwatchState {
    timer: number;
    state: StopWatchPerformState;
    timerCls: string;
    progress: number;
    roundProgress: number;
    trainingProgress: number;
    roundIdx: number;
    roundTotal: number;
    actionIdx: number;
    actionTotal: number;
    round: Round,
    action: StopwatchAction,
    roundDuration: number,
    totalDuration: number
}

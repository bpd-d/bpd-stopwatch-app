import * as React from "react";
import { StopwatchState } from "../PerformTraining";
import { SimpleCountDownTimer, CountDownTimer, NewCountDownTimer } from "./CountdownTimers";

export function getCountDownTimer(type: string, watchState: StopwatchState): JSX.Element {
    switch (type) {
        case "simple":
            return <SimpleCountDownTimer watchState={watchState} />
        case "circle":
            return <CountDownTimer watchState={watchState} />;
        case "test":
            return <NewCountDownTimer watchState={watchState} />;
        default:
            return <div></div>
    }
}
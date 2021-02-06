import * as React from "react";
import { StopwatchState } from "../interfaces";
import { SimpleCountDownTimer, CountDownTimer, NewCountDownTimer, SimpleExtCountDownTimer } from "./CountdownTimers";

export function getCountDownTimer(type: string, watchState: StopwatchState): JSX.Element {
    switch (type) {
        case "simple":
            return <SimpleCountDownTimer watchState={watchState} />
        case "circle":
            return <CountDownTimer watchState={watchState} />;
        case "test":
            return <NewCountDownTimer watchState={watchState} />;
        case "extended":
            return <SimpleExtCountDownTimer watchState={watchState} />;
        default:
            return <div></div>
    }
}
import * as React from 'react'
import { StopwatchState } from './PerformTraining';

export interface CountDownTimerProps {
    watchState: StopwatchState;
    actionIdx: number;
}

export function CountDownTimer(props: CountDownTimerProps) {
    return (<span className="cui-svg total-circle-progress" cui-circle-progress={props.watchState.trainingProgress}>
        <div className="">
            <span className="cui-svg current-circle-progress" cui-circle-progress={props.watchState.roundProgress}>
                <div>
                    <span className="cui-svg countdown-circle-progress" cui-circle-progress={props.watchState.progress}>
                        <div>
                            <span className="cui-block cui-text-small">{props.actionIdx + 1}</span>
                            <h1 className={"cui-h1 cui-margin-remove " + props.watchState.timerCls}>{props.watchState.timer}</h1>
                        </div>
                    </span>
                </div>
            </span>
        </div>
    </span>);
}

export function NewCountDownTimer(props: CountDownTimerProps) {
    return (
        <div>

            <div className="cui-flex-center">
                <progress className="cui-progress cui-small cui-success width-100" value={props.watchState.trainingProgress} max="100"></progress>
            </div>
            {/* <span className="cui-block cui-text-small">{props.actionIdx + 1}</span> */}
            <h1 className={"cui-h1 cui-margin-remove countdown-timer-size " + props.watchState.timerCls}>{props.watchState.timer}</h1>
            <div className="cui-flex-center">
                <progress className="cui-progress cui-small width-100" value={props.watchState.roundProgress} max="100"></progress>
            </div>

        </div>
    );
}

export function SimpleCountDownTimer(props: CountDownTimerProps) {
    return (
        <div>
            <p className="cui-margin-remove">{props.watchState.round?.name}</p>
            <p className="cui-text-muted cui-text-small cui-margin-remove">Round {props.watchState.roundIdx + 1} of {props.watchState.roundTotal}</p>
            <span className="cui-block cui-text-small">{props.actionIdx + 1}</span>
            <h1 className={"cui-h1 cui-margin-remove countdown-timer-size " + props.watchState.timerCls}>{props.watchState.timer}</h1>
            <h3 className={"cui-h3 "}>{props.watchState.action?.name}</h3>
        </div>
    );
}

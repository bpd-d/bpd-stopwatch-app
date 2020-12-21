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


export function SimpleCountDownTimer(props: CountDownTimerProps) {
    return (
        <div>
            <span className="cui-block cui-text-small">{props.actionIdx + 1}</span>
            <h1 className={"cui-h1 cui-margin-remove countdown-timer-size " + props.watchState.timerCls}>{props.watchState.timer}</h1>
        </div>
    );
}

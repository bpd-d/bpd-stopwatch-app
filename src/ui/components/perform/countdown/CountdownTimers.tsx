import * as React from 'react'
import { getTextClassByActionType } from '../../../../core/helpers';
import { CountDownTimerProps } from './models';


export function CountDownTimer(props: CountDownTimerProps) {

    return (
        <div className="rounded-countdown-timer">
            <p className="cui-margin-remove round-name">{props.watchState.round?.name}</p>
            <span className="cui-block cui-text-muted cui-text-small round-count">Round {props.watchState.roundIdx + 1}/{props.watchState.roundTotal}</span>
            <span className="cui-svg total-circle-progress" cui-circle-progress={props.watchState.trainingProgress}>
                <div className="">
                    <span className="cui-svg current-circle-progress" cui-circle-progress={props.watchState.roundProgress}>
                        <div>
                            <span className="cui-svg countdown-circle-progress" cui-circle-progress={props.watchState.progress}>
                                <div>
                                    <span className="cui-block cui-text-small">{props.watchState.actionIdx + 1}</span>
                                    <h1 className={"cui-h1 cui-margin-remove " + props.watchState.timerCls}>{props.watchState.timer}</h1>
                                </div>
                            </span>
                        </div>
                    </span>
                </div>
            </span>
        </div>);
}

export function NewCountDownTimer(props: CountDownTimerProps) {
    return (
        <div>

            <div className="cui-flex-center">
                <progress className="cui-progress cui-small cui-success width-100" value={props.watchState.trainingProgress} max="100"></progress>
            </div>
            {/* <span className="cui-block cui-text-small">{props.actionIdx + 1}</span> */}
            <h1 className={"cui-h1 countdown-timer-size " + props.watchState.timerCls}>{props.watchState.timer}</h1>
            <div className="cui-flex-center">
                <progress className="cui-progress cui-small width-100" value={props.watchState.roundProgress} max="100"></progress>
            </div>

        </div>
    );
}

export function SimpleCountDownTimer(props: CountDownTimerProps) {
    return (
        <div className="simple-countdown-timer">
            <p className="cui-margin-remove round-name">{props.watchState.round?.name}</p>
            <span className="cui-block cui-text-muted cui-text-small round-count">Round {props.watchState.roundIdx + 1}/{props.watchState.roundTotal}</span>
            <h1 className={"cui-h1 main-timer " + props.watchState.timerCls}>{props.watchState.timer}</h1>
            <h3 className={"cui-h2 cui-margin-remove action-name " + getTextClassByActionType(props.watchState.action?.type)}>{props.watchState.action?.name}</h3>
            <span className="cui-block cui-text-small action-index">Action {props.watchState.actionIdx + 1}/{props.watchState.actionTotal}</span>
        </div>
    );
}

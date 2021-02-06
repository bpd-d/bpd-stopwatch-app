import * as React from 'react'
import { calcDisplayTimer, getTextClassByActionType } from '../../../../core/helpers';
import { CountDownTimerProps } from './models';


/**
 * CIRCLE countdowm
 * @param props 
 */
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

/**
 * TEST
 * @param props 
 */
export function NewCountDownTimer(props: CountDownTimerProps) {
    return (
        <div>

            <div className="cui-flex-center">
                <progress className="cui-progress cui-small cui-success width-100" value={props.watchState.trainingProgress} max="100"></progress>
            </div>
            <h1 className={"cui-h1 countdown-timer-size " + props.watchState.timerCls}>{props.watchState.timer}</h1>
            <div className="cui-flex-center">
                <progress className="cui-progress cui-small width-100" value={props.watchState.roundProgress} max="100"></progress>
            </div>

        </div>
    );
}

/**
 * SIMPLE
 * @param props 
 */
export function SimpleCountDownTimer(props: CountDownTimerProps) {
    return (
        <div className="simple-countdown-timer">
            <p className="cui-margin-remove round-name">{props.watchState.round?.name}</p>
            <h3 className={"cui-h2 cui-margin-remove action-name " + getTextClassByActionType(props.watchState.action?.type)}>{props.watchState.action?.name}</h3>
            <div>
                <span className="cui-text-small round-count">Round {props.watchState.roundIdx + 1}/{props.watchState.roundTotal}</span>
                <span className="cui-margin-left cui-text-small action-index">Action {props.watchState.actionIdx + 1}/{props.watchState.actionTotal}</span>
            </div>

            <h1 className={"cui-h1 main-timer " + props.watchState.timerCls}>{calcDisplayTimer(props.watchState.timer)}</h1>
        </div>
    );
}

/**
 * SIMPLE EXT
 * @param props 
 */
export function SimpleExtCountDownTimer(props: CountDownTimerProps) {
    return (
        <>
            <div className="simple-countdown-timer">
                <p className="cui-margin-remove round-name">{props.watchState.round?.name}</p>
                <h3 className={"cui-h2 cui-margin-remove action-name " + getTextClassByActionType(props.watchState.action?.type)}>{props.watchState.action?.name}</h3>
                <h1 className={"cui-h1 main-timer " + props.watchState.timerCls}>{calcDisplayTimer(props.watchState.timer)}</h1>
            </div>
            <div className="cui-flex cui-between">
                <span className="cui-text-small round-count">Round {props.watchState.roundIdx + 1}/{props.watchState.roundTotal}</span>
                <span className="cui-margin-left cui-text-small action-index">Action {props.watchState.actionIdx + 1}/{props.watchState.actionTotal}</span>
            </div>
        </>
    );
}
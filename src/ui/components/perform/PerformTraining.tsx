import * as React from 'react'
import { useParams } from 'react-router-dom';
import { FlowTask } from '../../../../node_modules/bpd-flow/dist/index';
import { StopWatch, StopWatchState, StopWatchStateOptions } from '../../../api/stopwatch/stopwatch';
import { TestApi } from '../../../api/test/test';
import { calcDisplayTimer } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { NotFound } from '../common/NotFound';
import { RoundListItem } from '../edit/list';
import { useStopwatch } from './hook';

interface PerfromTrainingStateCls {
    training: Training;
    round: Round;
    roundIdx: number;
    action: StopwatchAction;
    actionIdx: number;
    timer: string;
    state: StopWatchState;
    stopwatch: StopWatch;
}

interface PerfromTrainingState {
    training: Training;
}

interface CurrentTrainingState {
    round: Round;
    roundIdx: number;
    action: StopwatchAction;
    actionIdx: number;
    class: string;
}

interface StopwatchState {
    timer: string;
    state: StopWatchState;
    startBtnCls: string;
    timerCls: string;
}

const defaultCurrent: CurrentTrainingState = {
    round: undefined,
    roundIdx: -1,
    actionIdx: -1,
    action: undefined,
    class: ""
}

export function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingState>({
        training: undefined,
    })

    const [stopwatch, setStopwatch] = React.useState<StopWatch>(undefined)
    const [current, setCurrent] = React.useState<CurrentTrainingState>(defaultCurrent)

    const [watchState, setWatchState] = React.useState<StopwatchState>({
        timer: "00:00",
        state: StopWatchStateOptions.STOPPED,
        startBtnCls: getStartBtnCls(StopWatchStateOptions.STOPPED),
        timerCls: ""
    })


    const { id } = useParams();

    const currentRef = React.useRef(current);
    currentRef.current = current;
    const trainingRef = React.useRef(state.training);
    trainingRef.current = state.training;

    function onGetTraining(training: Training) {
        if (training) {
            setState({
                ...state,
                training: training,
            })
            setCurrent({
                roundIdx: 0,
                round: training.rounds[0],
                action: training.rounds[0].actions[0],
                actionIdx: 0,
                class: getClassByType(training.rounds[0].actions[0].type)
            })
        }
    }

    function setNextAction(): boolean {
        let nextActionIdx = currentRef.current.actionIdx + 1;
        if (currentRef.current.round.actions.length > nextActionIdx) {
            let newAction = currentRef.current.round.actions[nextActionIdx]
            setCurrent({
                ...currentRef.current,
                actionIdx: nextActionIdx,
                action: newAction,
                class: getClassByType(newAction.type)
            })
            return true;
        }
        let nextRoundIdx = currentRef.current.roundIdx + 1;
        if (trainingRef.current.rounds.length > nextRoundIdx) {
            let newRound = trainingRef.current.rounds[nextRoundIdx];
            let newAction = newRound.actions[0];
            setCurrent({
                round: newRound,
                roundIdx: nextRoundIdx,
                actionIdx: 0,
                action: newAction,
                class: getClassByType(newAction.type)
            })
            return true;
        }
        let newRound = trainingRef.current.rounds[0];
        let newAction = newRound.actions[0];
        setCurrent({
            roundIdx: 0,
            round: newRound,
            action: newAction,
            actionIdx: 0,
            class: getClassByType(newAction.type)
        })
        return false;
    }

    function onStopwatchTick(currentTime: number, stopwatch: StopWatch): boolean {
        let ct = currentRef.current.action.duration - currentTime;
        if (ct > 0) {
            setWatchState({
                //...watchState,
                state: stopwatch.getState(),
                timer: calcDisplayTimer(ct),
                startBtnCls: getStartBtnCls(StopWatchStateOptions.RUNNING),
                timerCls: getTimerCls(ct)
            })
            return true;
        } else {
            stopwatch.reset();
            setWatchState({
                ...watchState,
                timer: "00:00",
                state: StopWatchStateOptions.RUNNING,
                startBtnCls: getStartBtnCls(StopWatchStateOptions.RUNNING)
            })
            if (!setNextAction()) {
                setStopWatchState(StopWatchStateOptions.STOPPED)
                return false;
            }
            return true;
        }
    }

    function onStartClick() {
        if (watchState.state === StopWatchStateOptions.STOPPED && stopwatch.start()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        } else if (watchState.state !== StopWatchStateOptions.STOPPED && stopwatch.stop()) {
            setWatchState({
                ...watchState,
                state: StopWatchStateOptions.STOPPED,
                timer: calcDisplayTimer(0),
                startBtnCls: getStartBtnCls(StopWatchStateOptions.STOPPED),
                timerCls: ""
            })
        }
    }

    function onPauseClick() {
        if (watchState.state === StopWatchStateOptions.RUNNING && stopwatch.pause()) {
            setStopWatchState(StopWatchStateOptions.PAUSED);
        } else if (watchState.state === StopWatchStateOptions.PAUSED && stopwatch && stopwatch.resume()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        }
    }

    function setStopWatchState(watchstate: StopWatchState) {
        setWatchState({
            ...watchState,
            state: watchstate,
            startBtnCls: getStartBtnCls(watchstate)
        })
    }

    function getClassByType(type: string) {
        switch (type) {
            case 'warmup':
                return "cui-text-success";
            case 'break':
                return "scui-text-error";
            case 'exercise':
                return "cui-text-accent";
            case 'cooldown':
                return "cui-text-secondar";
            default:
                return "";
        }
    }

    function getTimerCls(timer: number): string {
        return timer > 0 && timer <= 3 ? "cui-text-warning cui-animation-blink" : "";
    }

    function getStartBtnCls(state: StopWatchState) {
        console.log(state)
        return state !== StopWatchStateOptions.STOPPED ? "cui-error" : "cui-accent";
    }

    React.useEffect(() => {
        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })
        let stop = new StopWatch();
        stop.onTick(onStopwatchTick);
        setStopwatch(stop);
        if (id > -1) {
            window.$flow.perform("GET_TRAINING", id)

        }
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)
            if (stopwatch)
                stopwatch.finish();
        }
    }, [id])
    return (<>
        {!state.training ?
            <NotFound message="We couldn't find training" /> :
            <div className="stopwatch-layout-content cui-flex-center ">
                <div className="stopwatch-content-width cui-text-center">
                    <h2 className="cui-h2 ">{state.training.name}</h2>
                    <p>Round {current.roundIdx + 1} of {state.training.rounds.length}</p>

                    <h1 className={"cui-h1 cui-margin-remove-top " + watchState.timerCls}>{watchState.timer}</h1>
                    <div className="cui-text-bold">{current.actionIdx + 1}</div>
                    <h3 className={"cui-h3 " + current.class}>{current.action && current.action.name}</h3>
                    <div className="cui-flex cui-center">
                        {watchState.state !== StopWatchStateOptions.STOPPED && <button className="cui-button cui-default cui-margin-small-right" onClick={onPauseClick}>{watchState.state === StopWatchStateOptions.PAUSED ? "Resume" : "Pause"}</button>}
                        <button className={"cui-button " + watchState.startBtnCls} onClick={onStartClick}>{watchState.state === StopWatchStateOptions.STOPPED ? "Start" : "Stop"}</button>
                    </div>
                    <p className="cui-text-muted">{state.training.description}</p>
                </div>
            </div>
        }
    </>);
}

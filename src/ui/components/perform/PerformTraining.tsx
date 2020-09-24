import * as React from 'react'
import { useParams } from 'react-router-dom';
import { is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { KeepScreenAwakeFeature } from '../../../api/screen/screen';
import { StopWatch, StopWatchState, StopWatchStateOptions } from '../../../api/stopwatch/stopwatch';
import { SETTINGS_FLOW_ACTIONS } from '../../../app/flow/settings';
import { calcDisplayTimer, calculateProgress, showMessage } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { ActionValidator, RoundValidator, TrainingValidator } from '../../../core/validators';
import { NotFound } from '../common/NotFound';;

interface TimeStateData {
    time: number;
    progress: number;
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
    progress: number;
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
    const [canPlay, setCanPlay] = React.useState<boolean>(false);

    const [watchState, setWatchState] = React.useState<StopwatchState>({
        timer: "00:00",
        state: StopWatchStateOptions.STOPPED,
        startBtnCls: getStartBtnCls(StopWatchStateOptions.STOPPED),
        timerCls: "",
        progress: 100
    })

    const [errorMessage, setErrorMessage] = React.useState("");
    const { id } = useParams();

    const currentRef = React.useRef(current);
    currentRef.current = current;
    const trainingRef = React.useRef(state.training);
    trainingRef.current = state.training;

    function onGetTraining(training: Training) {
        let validation = new TrainingValidator().validate(training);
        if (!validation.status) {
            showMessage("Incorrect training", `Training is not correct: ${validation.errors.join(", ")}`)
            return;
        }
        let roundValidator = new RoundValidator().validate(training.rounds[0]);
        if (!roundValidator.status) {
            showMessage("Incorrect training", `Training is not correct: ${roundValidator.errors.join(", ")}`)
            return;
        }
        let actionValidator = new ActionValidator().validate(training.rounds[0].actions[0]);
        if (!actionValidator.status) {
            showMessage("Incorrect training", `Training is not correct: ${actionValidator.errors.join(", ")}`)
            return;
        }
        setState({
            ...state,
            training: training,
        })
        setDefaultCurrentState(training);
    }


    function setDefaultCurrentState(training: Training) {
        let round = training.rounds[0];
        let action = round.actions[0];
        setCurrent({
            roundIdx: 0,
            round: round,
            action: action,
            actionIdx: 0,
            class: getClassByType(action.type)
        })
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
        setDefaultCurrentState(trainingRef.current);
        return false;
    }

    function onStopwatchTick(currentTime: number, stopwatch: StopWatch): boolean {
        let ct = currentRef.current.action.duration - currentTime;
        let progress = calculateProgress(currentTime, currentRef.current.action.duration)
        // console.log(currentRef.current.action.duration)
        if (ct > 0) {
            setStopWatchState(stopwatch.getState(), { time: ct, progress: 100 - progress })
            if (ct > 0 && ct <= 3) {
                playSound();
            }
            return true;
        } else {
            playEndSound();
            stopwatch.reset();
            setStopWatchState(StopWatchStateOptions.RUNNING, { time: 0, progress: 100 })
            if (!setNextAction()) {
                setStopWatchState(StopWatchStateOptions.STOPPED, { time: 0, progress: 100 })
                return false;
            }
            return true;
        }
    }

    function onStartClick() {
        if (watchState.state === StopWatchStateOptions.STOPPED && stopwatch.start()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        } else if (watchState.state !== StopWatchStateOptions.STOPPED && stopwatch.stop()) {
            setStopWatchState(StopWatchStateOptions.STOPPED, { time: 0, progress: 99 });
            setDefaultCurrentState(state.training);
        }
    }

    function onPauseClick() {
        if (watchState.state === StopWatchStateOptions.RUNNING && stopwatch.pause()) {
            setStopWatchState(StopWatchStateOptions.PAUSED);
        } else if (watchState.state === StopWatchStateOptions.PAUSED && stopwatch && stopwatch.resume()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        }
    }

    function setStopWatchState(watchstate: StopWatchState, timeData?: TimeStateData) {
        if (!is(timeData) || timeData.time < 0) {
            setWatchState({
                ...watchState,
                state: watchstate,
                startBtnCls: getStartBtnCls(watchstate)
            })
        } else {
            setWatchState({
                timer: calcDisplayTimer(timeData.time),
                timerCls: getTimerCls(timeData.time),
                state: watchstate,
                startBtnCls: getStartBtnCls(watchstate),
                progress: timeData.progress
            })
        }
    }

    function playSound() {
        if (canPlay) {
            let note = document.getElementById("stopwatch-countdown") as HTMLAudioElement;
            note.currentTime = 0;
            note.play();
        }

    }

    function playEndSound() {
        if (canPlay) {
            let note = document.getElementById("stopwatch-end") as HTMLAudioElement;
            note.currentTime = 0;
            note.play();
        }
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
        return timer > 0 && timer <= 3 ? "cui-text-warning timer-blink-animation" : "";
    }

    function getStartBtnCls(state: StopWatchState) {
        console.log(state)
        return state !== StopWatchStateOptions.STOPPED ? "cui-error" : "cui-accent";
    }

    function onGetPlaySound(canPlay: boolean) {
        setCanPlay(canPlay);
    }

    React.useEffect(() => {
        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })
        const settingsPlaySound = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_SOUND_ENABLED, {
            finish: onGetPlaySound
        })
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_SOUND_ENABLED);
        const wakeLock = new KeepScreenAwakeFeature();
        try {
            wakeLock.activate();
        } catch (e) {
            setErrorMessage("We cannot activate feature to keep your device's screen awake during training performance")
        }
        let stop = new StopWatch();
        stop.onTick(onStopwatchTick);
        setStopwatch(stop);
        if (id > -1) {
            window.$flow.perform("GET_TRAINING", id)

        }
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_SOUND_ENABLED, settingsPlaySound.id);
            if (stopwatch)
                stopwatch.finish();
            wakeLock.release();
        }
    }, [id, canPlay])
    return (<>
        {!state.training ?
            <NotFound message="We couldn't find training" /> :
            <div className="stopwatch-layout-content cui-flex-center ">
                <div className="stopwatch-content-width perform-layout cui-text-center animation-fade-in">
                    <div className="perform-main-controls">
                        <h2 className="cui-h2 cui-margin-small-bottom">{state.training.name}</h2>
                        <p className="cui-text-muted">Round {current.roundIdx + 1} of {state.training.rounds.length}</p>
                        <span className="cui-svg countdown-circle-progress" cui-circle-progress={watchState.progress} id="stopwatch-circle-progress">
                            <div className="">
                                <h1 className={"cui-h1 cui-margin-remove-top cui-margin-remove-bottom " + watchState.timerCls}>{watchState.timer}</h1>
                                <div className="cui-margin-small-top"><span className="cui-text-small cui-text-muted">Activity {current.actionIdx + 1}</span></div>
                            </div>
                        </span>


                    </div>
                    <div className="perform-buttons">
                        <div>
                            <h3 className={"cui-h3 " + current.class}>{current.action && current.action.name}</h3>
                            <div className="cui-flex cui-center">
                                {watchState.state !== StopWatchStateOptions.STOPPED && <button className="cui-button cui-default cui-margin-small-right" onClick={onPauseClick}>{watchState.state === StopWatchStateOptions.PAUSED ? "Resume" : "Pause"}</button>}
                                <button className={"cui-button " + watchState.startBtnCls} onClick={onStartClick}>{watchState.state === StopWatchStateOptions.STOPPED ? "Start" : "Stop"}</button>
                            </div>
                            <p className="cui-text-muted">{state.training.description}</p>
                            <span className="cui-text-error">{errorMessage}</span>
                        </div>
                    </div>
                </div>
                <audio id="stopwatch-countdown" src="/static/audio/stopwatch_countdown.mp3" />
                <audio id="stopwatch-end" src="/static/audio/stopwatch_end.mp3" />
            </div>
        }
    </>);
}

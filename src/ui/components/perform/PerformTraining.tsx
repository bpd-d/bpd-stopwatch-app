import * as React from 'react'
import { useParams } from 'react-router-dom';
import { PUSH_ACTIONS } from '../../../app/push/push';
import { closeFullscreen, is, openFullscreen } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { KeepScreenAwakeFeature } from '../../../api/screen/screen';
import { StopWatch, StopWatchPerformState, StopWatchStateOptions } from '../../../api/stopwatch/stopwatch';
import { calcDisplayTimer, calculateDuration, calculateProgress, getBgClassByType, getTotalDuration, showMessage, getClassByType, setPageTitle, setNavbarTitle } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { CompleteTrainingValidator } from '../../../core/validators';
import { NotFound } from '../common/NotFound';
import { CountDownTimer, NewCountDownTimer, SimpleCountDownTimer } from './CountDownTimer';
import { useSettings } from '../../../ui/hooks/settings';
import { useIsFullscreen } from '../../../ui/hooks/useResize';
import { IconBtnLabel } from '../common/IconBtnLabel';
import { IconButton } from '../common/IconButton';
;

interface TimeStateData {
    time: number;
    progress: number;
    ct?: number;
    total: number;
}

interface PerfromTrainingState {
    training: Training;
}

export interface CurrentTrainingState {
    round: Round;
    roundIdx: number;
    action: StopwatchAction;
    actionIdx: number;
    class: string;
    roundDuration: number;
    totalDuration: number;
}

export interface StopwatchState {
    timer: string;
    state: StopWatchPerformState;
    timerCls: string;
    progress: number;
    roundProgress: number;
    trainingProgress: number;
    roundIdx: number;
    roundTotal: number;
    actionIdx: number;
    actionTotal: number;
}



// export interface StopwatchState {
//     timer: string;
//     state: StopWatchPerformState;
//     timerCls: string;
//     progress: number;
//     roundProgress: number;
//     trainingProgress: number;
// }

interface CurrentStateControls {
    startBtnCls: string;
    startBtnText: string;
    isPauseVisible: boolean;
    pauseBtnText: string;
    startBtnIcon: string;
    pauseBtnIcon: string;
}

const defaultCurrent: CurrentTrainingState = {
    round: undefined,
    roundIdx: -1,
    actionIdx: -1,
    action: undefined,
    class: "",
    roundDuration: 0,
    totalDuration: 0
}

export function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingState>({
        training: undefined
    })

    const [stopwatch, setStopwatch] = React.useState<StopWatch>(undefined)
    const [current, setCurrent] = React.useState<CurrentTrainingState>(defaultCurrent)

    const [watchState, setWatchState] = React.useState<StopwatchState>({
        timer: "-",
        state: StopWatchStateOptions.STOPPED,
        timerCls: "",
        progress: 100,
        roundProgress: 100,
        trainingProgress: 100,
        roundIdx: 0,
        roundTotal: 0,
        actionIdx: 0,
        actionTotal: 0
    })



    const [currentPlayStateControls, setCurrentPlayStateControls] = React.useState<CurrentStateControls>({
        startBtnText: "Start",
        startBtnCls: "cui-accent",
        pauseBtnText: "Pause",
        isPauseVisible: false,
        startBtnIcon: "media_play",
        pauseBtnIcon: "media_pause"
    })


    const [settings, setSettings] = useSettings();

    const [errorMessage, setErrorMessage] = React.useState("");
    const { id } = useParams();

    const currentRef = React.useRef(current);
    currentRef.current = current;
    const trainingRef = React.useRef(state.training);
    trainingRef.current = state.training;
    const watchStateRef = React.useRef(watchState);
    watchStateRef.current = watchState;
    const settingsRef = React.useRef(settings);
    settingsRef.current = settings;


    const countdownSound = React.useRef(null);
    const exerciseSound = React.useRef(null);
    const warmupSound = React.useRef(null);
    const breakSound = React.useRef(null);
    const cooldownSound = React.useRef(null);
    const endSound = React.useRef(null);
    const mainViewRef = React.useRef(null);

    const isFullscreen = useIsFullscreen(mainViewRef.current);

    function onGetTraining(training: Training) {
        let validation = new CompleteTrainingValidator().validate(training);
        if (!validation.status) {
            showMessage("Incorrect training", `Training is not correct: ${validation.errors.join(", ")}`)
            return;
        }
        setPageTitle(training.name);
        setNavbarTitle(training.name)
        setState({
            ...state,
            training: training
        })
        setDefaultCurrentState(training);
        setWatchState({
            ...watchState,
            roundTotal: training.rounds.length,
            actionTotal: training.rounds[0].actions.length,
        })
    }


    function setDefaultCurrentState(training: Training) {
        let round = training.rounds[0];
        let action = round.actions[0];
        setCurrent({
            roundIdx: 0,
            round: round,
            action: action,
            actionIdx: 0,
            class: getClassByType(action.type),
            roundDuration: calculateDuration(round.actions),
            totalDuration: getTotalDuration(training)[1]
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
            setWatchState({
                ...watchStateRef.current,
                actionIdx: nextActionIdx
            })
            return true;
        }
        let nextRoundIdx = currentRef.current.roundIdx + 1;
        if (trainingRef.current.rounds.length > nextRoundIdx) {
            let newRound = trainingRef.current.rounds[nextRoundIdx];
            let newAction = newRound.actions[0];
            setCurrent({
                ...currentRef.current,
                round: newRound,
                roundIdx: nextRoundIdx,
                actionIdx: 0,
                action: newAction,
                class: getClassByType(newAction.type),
                roundDuration: calculateDuration(newRound.actions),
            })
            setWatchState({
                ...watchStateRef.current,
                roundIdx: nextRoundIdx,
                actionTotal: newRound.actions.length,
                actionIdx: 0
            })
            return true;
        }
        setDefaultCurrentState(trainingRef.current);
        return false;
    }

    function onStopwatchTick(currentTime: number, total: number, stopwatch: StopWatch): boolean {
        let actionDuration = parseInt(currentRef.current.action.duration)
        let ct = actionDuration - currentTime;
        let progress = calculateProgress(currentTime, actionDuration)
        if (currentTime === 0) {
            playSound(currentRef.current.action.type);
        }
        if (ct > 0) {
            // Normal tick
            updateStopWatchState(stopwatch.getState(), {
                time: ct,
                progress: 100 - progress,
                ct: currentTime,
                total: total
            })
            // Start round end countdown
            if (ct <= 2) {
                playSound("countdown");
            }
            return true;
        } else {
            // Next action
            if (!setNextAction()) {
                // End of training
                playSound("end");
                updateStopWatchState(StopWatchStateOptions.STOPPED, {
                    time: 0, progress: 100, ct: 0, total: 0
                })
                return false;
            }
            playSound("countdown");
            updateStopWatchState(StopWatchStateOptions.RUNNING, { time: 0, progress: 0, ct: ct, total: total })
            stopwatch.reset();
            return true;
        }
    }

    function onStartClick() {
        if (watchState.state === StopWatchStateOptions.STOPPED && stopwatch.start()) {
            updateStopWatchState(StopWatchStateOptions.RUNNING);
        } else if (watchState.state !== StopWatchStateOptions.STOPPED && stopwatch.stop()) {
            setDefaultCurrentState(state.training);
            updateStopWatchState(StopWatchStateOptions.STOPPED, { time: 0, progress: 100, ct: 0, total: 0 });

        }
    }

    function onPauseClick() {
        if (watchState.state === StopWatchStateOptions.RUNNING && stopwatch.pause()) {
            updateStopWatchState(StopWatchStateOptions.PAUSED);
        } else if (watchState.state === StopWatchStateOptions.PAUSED && stopwatch && stopwatch.resume()) {
            updateStopWatchState(StopWatchStateOptions.RUNNING);
        }
    }

    function updateStopWatchState(watchstate: StopWatchPerformState, timeData?: TimeStateData) {
        if (!is(timeData) || timeData.time < 0) {
            setWatchState({
                ...watchStateRef.current,
                state: watchstate,
            })
        } else {
            let roundProgress = calculateRoundProgress(timeData.ct);
            let trainginProgress = calculateTrainingProgress(timeData.total);
            setWatchState({
                ...watchStateRef.current,
                timer: calcDisplayTimer(timeData.time),
                timerCls: getTimerCls(timeData.time, watchstate),
                state: watchstate,
                progress: timeData.progress,
                roundProgress: roundProgress,
                trainingProgress: trainginProgress
            })
        }
        updatePlayStateControls(watchstate);
    }

    function calculateRoundCurrentTime(ct: number) {
        return currentRef.current.round.actions.reduce<number>((result: number, act: StopwatchAction, idx: number) => {
            if (idx < currentRef.current.actionIdx) {
                return result + parseInt(act.duration);
            }
            return result;
        }, 0) + ct;
    }

    function calculateRoundProgress(ct: number) {
        return 100 - calculateProgress(calculateRoundCurrentTime(ct), currentRef.current.roundDuration);
    }

    function calculateTrainingProgress(ct: number) {
        return 100 - calculateProgress(ct, currentRef.current.totalDuration);
    }

    function playSound(type: string) {
        if (!settingsRef.current.soundEnabled) {
            return
        }
        let element = undefined;
        switch (type) {
            case "countdown":
                element = countdownSound.current;
                break;
            case "end":
                element = endSound.current;
                break;
            case "exercise":
                element = exerciseSound.current;
                break;
            case "warmup":
                element = warmupSound.current;
                break;
            case "break":
                element = breakSound.current;
                break;
            case "cooldown":
                element = cooldownSound.current;
                break;

        }
        if (element) {
            element.currentTime = 0;
            element.play();
        }
    }

    function getTimerCls(timer: number, state: StopWatchPerformState): string {
        return state === StopWatchStateOptions.RUNNING && timer >= 0 && timer < 3 ? "cui-text-warning timer-blink-animation" : "";
    }

    function updatePlayStateControls(state: StopWatchPerformState) {
        switch (state) {
            case StopWatchStateOptions.RUNNING:
                setCurrentPlayStateControls({
                    startBtnCls: "cui-error",
                    startBtnIcon: "media_stop",
                    startBtnText: "Stop",
                    isPauseVisible: true,
                    pauseBtnIcon: "media_pause",
                    pauseBtnText: "Pause"
                })
                break;
            case StopWatchStateOptions.PAUSED:
                setCurrentPlayStateControls({
                    startBtnCls: "cui-error",
                    startBtnIcon: "media_stop",
                    startBtnText: "Stop",
                    isPauseVisible: true,
                    pauseBtnIcon: "media_play",
                    pauseBtnText: "Resume"
                })
                break;
            case StopWatchStateOptions.STOPPED:
                setCurrentPlayStateControls({
                    startBtnCls: "cui-accent",
                    startBtnIcon: "media_play",
                    startBtnText: "Start",
                    isPauseVisible: false,
                    pauseBtnIcon: "media_pause",
                    pauseBtnText: "Pause"
                })
                break;
        }

    }

    function getBackgroundClass(action: StopwatchAction) {
        return !is(action) ? "" : getBgClassByType(action.type);
    }

    function onFullScreen() {
        if (!mainViewRef.current) {
            return;
        }
        if (isFullscreen) {
            closeFullscreen();
        }
        openFullscreen(mainViewRef.current);
    }

    React.useEffect(() => {
        setPageTitle("Perform training");

        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })

        const wakeLock = new KeepScreenAwakeFeature();
        try {
            wakeLock.activate();
        } catch (e) {
            setErrorMessage("We could not activate feature to keep your device's screen awake during training performance")
        }
        let stop = new StopWatch();
        stop.onTick(onStopwatchTick);
        setStopwatch(stop);
        if (id > -1) {
            window.$flow.perform("GET_TRAINING", id)

        }
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)
            if (stopwatch) {
                stopwatch.stop();
            }
            wakeLock.release();
        }
    }, [id, settings.soundEnabled])
    return (<>
        {!state.training ?
            <NotFound message="We couldn't find training" /> :
            <div className="stopwatch-layout-content  cui-background-default" ref={mainViewRef}>
                <div className={"cui-height-1-1 cui-overflow-y-auto cui-flex cui-center cui-middle " + getBackgroundClass(current.action)} >
                    <div className="stopwatch-content-width perform-layout cui-text-center animation-fade-in ">
                        <div className="perform-main-controls">
                            <p className="cui-margin-remove">{state?.training?.rounds[current.roundIdx]?.name}</p>
                            <p className="cui-text-muted cui-text-small cui-margin-remove">Round {current.roundIdx + 1} of {state.training.rounds.length}</p>
                            <div className="cui-flex-center">
                                {settings.simpleView ? <SimpleCountDownTimer actionIdx={current.actionIdx} watchState={watchState} /> : <CountDownTimer actionIdx={current.actionIdx} watchState={watchState} />}
                            </div>
                        </div>
                        <div className="perform-buttons">
                            <div className="cui-width-1-1">
                                <h3 className={"cui-h3 " + current.class}>{current.action && current.action.name}</h3>
                                <div className="cui-flex cui-center">
                                    {currentPlayStateControls.isPauseVisible && <IconButton icon={currentPlayStateControls.pauseBtnIcon} label={currentPlayStateControls.pauseBtnText} onClick={onPauseClick} modifiers="cui-margin-small-right" />}
                                    <IconButton icon={currentPlayStateControls.startBtnIcon} label={currentPlayStateControls.startBtnText} onClick={onStartClick} modifiers={currentPlayStateControls.startBtnCls} />
                                </div>
                                <p className="cui-text-muted">{state.training.description}</p>
                                <div className="">
                                    {is(errorMessage) && <span className="cui-icon cui-error cui-tooltip" cui-icon="ban" data-tooltip={errorMessage}></span>}
                                    <a className="cui-icon-button cui-default" cui-icon={settings.soundEnabled ? "speaker" : "volume_muted"} onClick={() => {
                                        setSettings({
                                            ...settings,
                                            soundEnabled: !settings.soundEnabled
                                        })
                                    }}></a>
                                    <a className="cui-icon-button cui-default cui-margin-small-left" cui-icon={isFullscreen ? "shrink" : "expand"} onClick={onFullScreen}></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <audio ref={countdownSound} id="stopwatch-countdown" src="/static/audio/stopwatch_countdown.mp3" />
                    <audio ref={exerciseSound} id="stopwatch-exercise" src="/static/audio/stopwatch_exercise.mp3" />
                    <audio ref={warmupSound} id="stopwatch-warmup" src="/static/audio/stopwatch_warmup.mp3" />
                    <audio ref={breakSound} id="stopwatch-break" src="/static/audio/stopwatch_break.mp3" />
                    <audio ref={cooldownSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_cooldown.mp3" />
                    <audio ref={endSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_end.mp3" />
                </div>
            </div>
        }
    </>);
}

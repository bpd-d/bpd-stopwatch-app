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
import { CountDownTimer, SimpleCountDownTimer } from './CountDownTimer';
import { useSettings } from '../../../ui/hooks/settings';
import { useIsFullscreen } from '../../../ui/hooks/useResize';
import { IconButton } from '../common/IconButton';
import { useIsLoading } from '../../../ui/hooks/loading';
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
    round: Round,
    action: StopwatchAction,
    roundDuration: number,
    totalDuration: number
}



interface CurrentStateControls {
    startBtnCls: string;
    startBtnText: string;
    isPauseVisible: boolean;
    pauseBtnText: string;
    startBtnIcon: string;
    pauseBtnIcon: string;
}


export function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingState>({
        training: undefined
    })

    const [isLoading, setIsLoading] = useIsLoading(false);

    const { id } = useParams();

    function onGetTraining(training: Training) {
        let validation = new CompleteTrainingValidator().validate(training);
        if (!validation.status) {
            showMessage("Incorrect training", `Training is not correct: ${validation.errors.join(", ")}`)
            return;
        }
        setIsLoading(false);
        setState({
            training: training
        })
    }

    React.useEffect(() => {
        setPageTitle("Perform training");

        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })

        if (id > -1) {
            setIsLoading(true);
            window.$flow.perform("GET_TRAINING", id)

        }
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)


        }
    }, [id])
    return (<>
        {isLoading ? <div className="cui-height-1-1 cui-flex-center">Loading...</div> : (
            !state.training ? <NotFound message="We couldn't find training" classes="cui-height-1-1 cui-flex-center" /> :
                <PerformTrainingElement training={state.training} />
        )}
    </>);
}


export interface PerformTrainingElementProps {
    training: Training;
}

export function PerformTrainingElement(props: PerformTrainingElementProps) {

    const [stopwatch, setStopwatch] = React.useState<StopWatch>(undefined)

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
        actionTotal: 0,
        roundDuration: 0,
        totalDuration: 0,
        action: undefined,
        round: undefined,
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


    const trainingRef = React.useRef(props.training);
    trainingRef.current = props.training;
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

    function setDefaultWatchState(training: Training) {
        let round = training.rounds[0];
        let action = round.actions[0];
        setWatchState({
            ...watchState,
            round: round,
            roundIdx: 0,
            roundTotal: training.rounds.length,
            roundDuration: calculateDuration(round.actions),
            actionIdx: 0,
            action: action,
            actionTotal: round.actions.length,
            totalDuration: getTotalDuration(training)[1]
        })
    }

    function setNextAction(): boolean {
        let nextActionIdx = watchStateRef.current.actionIdx + 1;
        if (watchStateRef.current.round.actions.length > nextActionIdx) {
            let newAction = watchStateRef.current.round.actions[nextActionIdx]
            setWatchState({
                ...watchStateRef.current,
                actionIdx: nextActionIdx,
                action: newAction,
            })
            return true;
        }
        let nextRoundIdx = watchStateRef.current.roundIdx + 1;
        if (trainingRef.current.rounds.length > nextRoundIdx) {
            let newRound = trainingRef.current.rounds[nextRoundIdx];
            let newAction = newRound.actions[0];

            setWatchState({
                ...watchStateRef.current,
                actionIdx: 0,
                action: newAction,
                actionTotal: newRound.actions.length,
                round: newRound,
                roundIdx: nextRoundIdx,
                roundDuration: calculateDuration(newRound.actions),
            })
            return true;
        }
        setDefaultWatchState(trainingRef.current);
        return false;
    }

    function onStopwatchTick(currentTime: number, total: number, stopwatch: StopWatch): boolean {
        let actionDuration = parseInt(watchStateRef.current.action.duration)//parseInt(currentRef.current.action.duration)
        let ct = actionDuration - currentTime;
        let progress = calculateProgress(currentTime, actionDuration)
        if (currentTime === 0) {
            playSound(watchStateRef.current.action.type);
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
            setDefaultWatchState(props.training);
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
        return watchStateRef.current.round.actions.reduce<number>((result: number, act: StopwatchAction, idx: number) => {
            if (idx < watchStateRef.current.actionIdx) {
                return result + parseInt(act.duration);
            }
            return result;
        }, 0) + ct;
    }

    function calculateRoundProgress(ct: number) {
        return 100 - calculateProgress(calculateRoundCurrentTime(ct), watchStateRef.current.roundDuration);
    }

    function calculateTrainingProgress(ct: number) {
        return 100 - calculateProgress(ct, watchStateRef.current.totalDuration);
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
        const wakeLock = new KeepScreenAwakeFeature();
        if (props.training) {
            setPageTitle(props.training.name);
            setNavbarTitle(props.training.name)
            setDefaultWatchState(props.training);

            try {
                wakeLock.activate();
            } catch (e) {
                setErrorMessage("We could not activate feature to keep your device's screen awake during training performance")
            }
            let stop = new StopWatch();
            stop.onTick(onStopwatchTick);
            setStopwatch(stop);
        }

        return () => {
            if (stopwatch) {
                stopwatch.stop();
            }
            wakeLock.release();
        }
    }, [props.training, settings.soundEnabled])
    return (<div className="stopwatch-layout-content cui-background-default" ref={mainViewRef}>
        <div className={"cui-height-1-1 cui-overflow-y-auto cui-flex cui-center cui-middle " + getBackgroundClass(watchState.action)} >
            <div className="stopwatch-content-width perform-layout cui-text-center animation-fade-in">
                <div className="perform-main-controls">
                    <p className="cui-margin-remove">{watchState.round?.name}</p>
                    <p className="cui-text-muted cui-text-small cui-margin-remove">Round {watchState.roundIdx + 1} of {watchState.roundTotal}</p>
                    <div className="cui-flex-center">
                        {settings.simpleView ? <SimpleCountDownTimer actionIdx={watchState.actionIdx} watchState={watchState} /> : <CountDownTimer actionIdx={watchState.actionIdx} watchState={watchState} />}
                    </div>
                </div>
                <div className="perform-buttons">
                    <div className="cui-width-1-1">
                        <h3 className={"cui-h3 "}>{watchState.action?.name}</h3>
                        <p className="cui-text-muted">{props.training?.description}</p>
                    </div>
                </div>
            </div>
            {/* Show button bar */}
            <div className="cui-position-float cui-position-bottom cui-position-center training-control-btns app-float-bottom cui-flex cui-center cui-middle cui-background-shade cui-corner-circle">
                <a className="cui-icon-button cui-default cui-margin-small-right" cui-icon={settings.soundEnabled ? "speaker" : "volume_muted"} onClick={() => {
                    setSettings({
                        ...settings,
                        soundEnabled: !settings.soundEnabled
                    })
                }}></a>
                {currentPlayStateControls.isPauseVisible && <IconButton icon={currentPlayStateControls.pauseBtnIcon} onClick={onPauseClick} modifiers="cui-margin-small-right cui-large cui-default" />}
                <IconButton icon={currentPlayStateControls.startBtnIcon} onClick={onStartClick} modifiers={"cui-large " + currentPlayStateControls.startBtnCls} />
                <a className="cui-icon-button cui-default cui-margin-small-left" cui-icon={isFullscreen ? "shrink" : "expand"} onClick={onFullScreen}></a>
            </div>
            {/* Show error message */}
            {is(errorMessage) &&
                <div className="cui-position-float cui-position-bottom cui-position-right app-float-bottom cui-margin-right"><span className="cui-icon cui-error cui-tooltip" cui-icon="ban" cui-tooltip={errorMessage}></span></div>}
            <audio ref={countdownSound} id="stopwatch-countdown" src="/static/audio/stopwatch_countdown.mp3" />
            <audio ref={exerciseSound} id="stopwatch-exercise" src="/static/audio/stopwatch_exercise.mp3" />
            <audio ref={warmupSound} id="stopwatch-warmup" src="/static/audio/stopwatch_warmup.mp3" />
            <audio ref={breakSound} id="stopwatch-break" src="/static/audio/stopwatch_break.mp3" />
            <audio ref={cooldownSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_cooldown.mp3" />
            <audio ref={endSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_end.mp3" />
        </div>
    </div>);
}


/*
<div className="stopwatch-layout-content cui-background-default" ref={mainViewRef}>
        <div className={"cui-height-1-1 cui-overflow-y-auto cui-flex cui-center cui-middle " + getBackgroundClass(watchState.action)} >
            <div className="stopwatch-content-width perform-layout cui-text-center animation-fade-in">
                <div className="perform-main-controls">
                    <p className="cui-margin-remove">{watchState.round?.name}</p>
                    <p className="cui-text-muted cui-text-small cui-margin-remove">Round {watchState.roundIdx + 1} of {watchState.roundTotal}</p>
                    <div className="cui-flex-center">
                        {settings.simpleView ? <SimpleCountDownTimer actionIdx={watchState.actionIdx} watchState={watchState} /> : <CountDownTimer actionIdx={watchState.actionIdx} watchState={watchState} />}
                    </div>
                </div>
                <div className="perform-buttons">
                    <div className="cui-width-1-1">
                        <h3 className={"cui-h3 "}>{watchState.action?.name}</h3>
                        <div className="cui-flex cui-center">
                            {currentPlayStateControls.isPauseVisible && <IconButton icon={currentPlayStateControls.pauseBtnIcon} onClick={onPauseClick} modifiers="cui-margin-small-right cui-large cui-default" />}
                            <IconButton icon={currentPlayStateControls.startBtnIcon} onClick={onStartClick} modifiers={"cui-large " + currentPlayStateControls.startBtnCls} />
                        </div>
                        <p className="cui-text-muted">{props.training?.description}</p>
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
*/
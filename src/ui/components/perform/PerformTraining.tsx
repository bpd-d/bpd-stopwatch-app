import * as React from 'react'
import { useParams } from 'react-router-dom';
import { closeFullscreen, is, openFullscreen } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { KeepScreenAwakeFeature } from '../../../api/screen/screen';
import { StopWatch, StopWatchPerformState, StopWatchStateOptions } from '../../../api/stopwatch/stopwatch';
import { calculateDuration, calculateProgress, getBgClassByType, getTotalDuration, showMessage, setPageTitle, setNavbarTitle } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { CompleteTrainingValidator } from '../../../core/validators';
import { NotFound } from '../common/NotFound';
import { useSettings } from '../../../ui/hooks/settings';
import { useIsFullscreen } from '../../../ui/hooks/useResize';
import { useIsLoading } from '../../../ui/hooks/loading';
import { TrainingSoundPlayer, TrainingSoundPlayerItemProps } from './TrainingSoundPlayer';
import { useStopwatch2 } from './hook';
import { PerformerButtonBar } from './PerformButtonBar';
import { getCountDownTimer } from './countdown/functions';
import { Loading } from '../common/Loading';
import { PerfromTrainingState, StopwatchState, TimeStateData } from './interfaces';


export default function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingState>({
        training: undefined
    })

    const [isLoading, setIsLoading] = useIsLoading(false);
    const [notFound, setNotFound] = React.useState(false);

    const { id } = useParams();

    function onGetTraining(training: Training) {
        if (!training) {
            setNotFound(true);
        }
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

    if (isLoading) {
        return <Loading />;
    } else if (notFound) {
        return <NotFound message="We couldn't find training" classes="cui-height-1-1 cui-flex-center" />;
    } else if (!state.training) {
        return <span></span>;
    }
    return (<PerformTrainingElement training={state.training} />);
}


interface PerformTrainingElementProps {
    training: Training;
}

function PerformTrainingElement(props: PerformTrainingElementProps) {

    const [errorMessage, setErrorMessage] = React.useState("");

    function callError(message: string) {
        setErrorMessage(message);
    }

    React.useEffect(() => {
        setPageTitle("Perform training");
        const wakeLock = new KeepScreenAwakeFeature();
        if (props.training) {
            setPageTitle(props.training.name);
            setNavbarTitle(props.training.name);
            try {
                wakeLock.activate();
            } catch (e) {
                setErrorMessage("We could not activate feature to keep your device's screen awake during training performance")
            }

        }

        return () => {
            wakeLock.release();
        }
    }, [props.training])
    return (<>
        <TrainingSoundPlayer>
            <TrainingPerformer key={props.training?.id} callError={callError} training={props.training} />
        </TrainingSoundPlayer>
        {
            is(errorMessage) &&
            <div className="cui-position-float cui-position-bottom cui-position-right app-float-bottom cui-margin-right"><span className="cui-icon cui-error cui-tooltip" cui-icon="ban" cui-tooltip={errorMessage}></span></div>
        }
    </>
    );
}

interface TrainingPerformerProps {
    callError: (error: string) => void;
    training: Training;
}

function TrainingPerformer(props: TrainingPerformerProps & TrainingSoundPlayerItemProps) {

    const [stopwatch, setOnTick] = useStopwatch2();

    const [watchState, setWatchState] = React.useState<StopwatchState>({
        timer: 0,
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

    const [settings, setSettings] = useSettings();


    const stopWatchRef = React.useRef(stopwatch);
    stopWatchRef.current = stopwatch;
    const watchStateRef = React.useRef(watchState);
    watchStateRef.current = watchState;
    const settingsRef = React.useRef(settings);
    settingsRef.current = settings;

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
        if (props.training.rounds.length > nextRoundIdx) {
            let newRound = props.training.rounds[nextRoundIdx];
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
        setDefaultWatchState(props.training);
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
            stopWatchRef.current.reset();
            return true;
        }
    }

    function playSound(name: string) {
        if (!settingsRef.current.soundEnabled || !props.playSound || !is(name)) {
            return
        }

        props.playSound(name);
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
                timer: timeData.time,
                timerCls: getTimerCls(timeData.time, watchstate),
                state: watchstate,
                progress: timeData.progress,
                roundProgress: roundProgress,
                trainingProgress: trainginProgress
            })
        }
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

    function getTimerCls(timer: number, state: StopWatchPerformState): string {
        return state === StopWatchStateOptions.RUNNING && timer >= 0 && timer < 3 ? "cui-text-warning timer-blink-animation" : "";
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
        
        if (props.training) {
            setDefaultWatchState(props.training);
            setOnTick(onStopwatchTick);
        }

        return () => {
            if (stopWatchRef.current) {
                stopWatchRef.current.stop();
            }
        }
    }, [props.training])

    return (<div className="stopwatch-layout-content cui-background-default" ref={mainViewRef}>
        <div className={"cui-height-1-1 cui-overflow-y-auto cui-flex cui-center cui-middle " + getBackgroundClass(watchState.action)} >
            <div className="stopwatch-content-width cui-text-center cui-flex-center animation-fade-in">
                <div>
                    {getCountDownTimer(settings.countdownView, watchState)}
                </div>
            </div>
        </div>
        <PerformerButtonBar playState={watchState.state}
            soundIcon={settings.soundEnabled ? "speaker" : "volume_muted"}
            fullscreenIcon={isFullscreen ? "shrink" : "expand"}
            onFullScreen={onFullScreen}
            onStartStop={onStartClick}
            onPauseResume={onPauseClick}
            onMute={() => {
                setSettings({
                    ...settings,
                    soundEnabled: !settings.soundEnabled
                })
            }}
        />
    </div>);
}


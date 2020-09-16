import * as React from 'react'
import { useParams } from 'react-router-dom';
import { StopWatch, StopWatchState, StopWatchStateOptions } from '../../../api/stopwatch/stopwatch';
import { calcDisplayTimer } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { NotFound } from '../common/NotFound';

interface PerfromTrainingState {
    training: Training;
}

interface CurrentTrainingState {
    round: Round;
    roundIdx: number;
    action: StopwatchAction;
    actionIdx: number;
}

interface StopwatchState {
    timer: string;
    state: StopWatchState;
}

export function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingState>({
        training: undefined
    })
    const [current, setCurrent] = React.useState<CurrentTrainingState>({
        round: undefined,
        roundIdx: -1,
        actionIdx: -1,
        action: undefined
    })

    const [watchState, setWatchState] = React.useState<StopwatchState>({
        timer: "00:00",
        state: StopWatchStateOptions.STOPPED
    })

    const stopwatch = new StopWatch();
    stopwatch.onTick(onStopwatchTick)
    const { id } = useParams();

    function onGetTraining(training: Training) {
        if (training) {
            setState({
                training: training
            })
            if (training.rounds && training.rounds.length > 0) {
                setCurrent({
                    roundIdx: 0,
                    round: training.rounds[0],
                    action: training.rounds[0].actions[0],
                    actionIdx: 0
                })
            }

        }
    }

    function onStopwatchTick(current: number, stopwatch: StopWatch): boolean {
        setWatchState({
            ...watchState,
            state: stopwatch.getState(),
            timer: calcDisplayTimer(current)
        })
        return true;
    }

    function onStartClick() {
        if (stopwatch.start()) {
            setWatchState({
                ...watchState,
                state: StopWatchStateOptions.RUNNING
            })
        }
    }

    function onPauseClick() {
        console.log(stopwatch.getState())
        if (watchState.state === StopWatchStateOptions.RUNNING) {
            if (stopwatch.pause()) {
                setWatchState({
                    ...watchState,
                    state: StopWatchStateOptions.PAUSED
                })
            }
        } else if (watchState.state === StopWatchStateOptions.PAUSED) {
            if (stopwatch.resume()) {
                setWatchState({
                    ...watchState,
                    state: StopWatchStateOptions.RUNNING
                })
            }
        }

    }


    React.useEffect(() => {
        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })
        if (id > -1) {
            window.$flow.perform("GET_TRAINING", id)
        }
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)
        }
    }, [id])
    return (<>
        {!state.training ?
            <NotFound message="We couldn't find training" /> :
            <div className="stopwatch-layout-content cui-flex-center">
                {/* Content */}
                <div className="stopwatch-content-width cui-text-center">
                    <h2 className="cui-h2 ">{state.training.name}</h2>
                    <h1 className="cui-h1">{watchState.timer}</h1>
                    <p>Round {current.roundIdx + 1} of {state.training.rounds.length}</p>
                    <h3 className="cui-h3">{current.action && current.action.name}</h3>
                    <div className="cui-flex cui-center">
                        {watchState.state !== StopWatchStateOptions.STOPPED && <button className="cui-button cui-default cui-margin-small-right" onClick={onPauseClick}>Pause</button>}
                        <button className="cui-button cui-accent" onClick={onStartClick}>Start</button>
                    </div>
                    <p className="cui-text-muted">{state.training.description}</p>
                </div>
            </div>
        }
    </>);
}

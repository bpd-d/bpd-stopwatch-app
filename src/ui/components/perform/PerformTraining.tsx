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
    //stopWatch: StopWatch;
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

// export class PerfromTraining extends React.Component<any, PerfromTrainingStateCls> {
//     stopwatch: StopWatch;
//     subscription: FlowTask<any>;
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             training: undefined,
//             action: undefined,
//             round: undefined,
//             roundIdx: -1,
//             actionIdx: -1,
//             state: StopWatchStateOptions.STOPPED,
//             timer: "00:00"
//         }

//         this.onStartClick = this.onStartClick.bind(this);
//         this.onPauseClick = this.onPauseClick.bind(this);
//         this.stopwatch = new StopWatch();
//         this.onStopWatchTick = this.onStopWatchTick.bind(this);
//     }

//     componentDidMount() {
//         this.stopwatch.onTick(this.onStopWatchTick)
//         this.subscription = window.$flow.subscribe("GET_TRAINING", { finish: this.onGetTraining })
//         window.$flow.perform("GEt")
//     }

//     componentWillUnmount() {
//         window.$flow.unsubscribe("GET_TRAINING", this.subscription.id);
//     }

//     componentDidUpdate() {

//     }

//     onPauseClick() {

//     }

//     onStartClick() {
//         this.stopwatch.start();
//     }

//     onStopWatchTick(current: number, stopwatch: StopWatch) {
//         console.log(current)
//         return true;
//     }

//     onGetTraining(training: Training) {
//         this.setState({
//             ...this.state,
//             training: training
//         })
//     }

//     render() {
//         return (<>
//             {!this.state.training ?
//                 <NotFound message="We couldn't find training" /> :
//                 <div className="stopwatch-layout-content cui-flex-center">
//                     {/* Content */}
//                     <div className="stopwatch-content-width cui-text-center">
//                         <h2 className="cui-h2 ">{this.state.training.name}</h2>
//                         <h1 className="cui-h1">{this.state.timer}</h1>
//                         <p>Round {this.state.roundIdx + 1} of {this.state.training.rounds.length}</p>
//                         <h3 className="cui-h3">{this.state.action && this.state.action.name}</h3>
//                         <div className="cui-flex cui-center">
//                             {this.state.state !== StopWatchStateOptions.STOPPED && <button className="cui-button cui-default cui-margin-small-right" onClick={this.onPauseClick}>{this.state.state === StopWatchStateOptions.PAUSED ? "Resume" : "Pause"}</button>}
//                             <button className="cui-button cui-accent" onClick={this.onStartClick}>{this.state.state === StopWatchStateOptions.STOPPED ? "Start" : "Stop"}</button>
//                         </div>
//                         <p className="cui-text-muted">{this.state.training.description}</p>
//                     </div>
//                 </div>
//             }
//         </>)
//     }
// }

export function PerfromTraining() {
    const [state, setState] = React.useState<PerfromTrainingStateCls>({
        training: undefined,
        round: undefined,
        roundIdx: -1,
        actionIdx: -1,
        action: undefined,
        timer: "00:00",
        state: StopWatchStateOptions.STOPPED,
        stopwatch: undefined
    })

    const stopwatch: StopWatch = useStopwatch(onStopwatchTick)
    // const [current, setCurrent] = React.useState<CurrentTrainingState>({

    // })

    // const [watchState, setWatchState] = React.useState<StopwatchState>({

    // })


    const { id } = useParams();

    function onGetTraining(training: Training) {
        if (training) {
            setState({
                ...state,
                training: training,
                roundIdx: 0,
                round: training.rounds[0],
                action: training.rounds[0].actions[0],
                actionIdx: 0,
            })
        }
    }

    function setNextAction(): boolean {
        let nextActionIdx = state.actionIdx;
        if (state.round.actions.length > nextActionIdx) {
            setState({
                ...state,
                actionIdx: nextActionIdx,
                action: state.round.actions[nextActionIdx]
            })
            return true;
        }
        let nextRoundIdx = state.roundIdx + 1;
        if (state.training.rounds.length > nextRoundIdx) {
            let newRound = state.training.rounds[nextRoundIdx];
            setState({
                ...state,
                round: newRound,
                roundIdx: nextRoundIdx,
                actionIdx: 0,
                action: newRound.actions[0]
            })
            return true;
        }
        return false;
    }

    function onStopwatchTick(currentTime: number, stopwatch: StopWatch): boolean {
        let ct = state.action.duration - currentTime;
        if (ct > 0) {
            setState({
                ...state,
                state: stopwatch.getState(),
                timer: calcDisplayTimer(ct)
            })
            return true;
        } else {
            stopwatch.reset();
            setState({
                ...state,
                timer: "00:00"
            })
            return setNextAction();
        }
    }

    function onStartClick() {
        if (state.state === StopWatchStateOptions.STOPPED && stopwatch.start()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        } else if (state.state !== StopWatchStateOptions.STOPPED && stopwatch.stop()) {
            setState({
                ...state,
                state: StopWatchStateOptions.STOPPED,
                timer: calcDisplayTimer(0)
            })
        }
    }

    function onPauseClick() {
        if (state.state === StopWatchStateOptions.RUNNING && stopwatch.pause()) {
            setStopWatchState(StopWatchStateOptions.PAUSED);
        } else if (state.state === StopWatchStateOptions.PAUSED && stopwatch && stopwatch.resume()) {
            setStopWatchState(StopWatchStateOptions.RUNNING);
        }
    }

    function setStopWatchState(watchstate: StopWatchState) {
        setState({
            ...state,
            state: watchstate
        })
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
                    <h1 className="cui-h1">{state.timer}</h1>
                    <p>Round {state.roundIdx + 1} of {state.training.rounds.length}</p>
                    <h3 className="cui-h3">{state.action && state.action.name}</h3>
                    <div className="cui-flex cui-center">
                        {state.state !== StopWatchStateOptions.STOPPED && <button className="cui-button cui-default cui-margin-small-right" onClick={onPauseClick}>{state.state === StopWatchStateOptions.PAUSED ? "Resume" : "Pause"}</button>}
                        <button className="cui-button cui-accent" onClick={onStartClick}>{state.state === StopWatchStateOptions.STOPPED ? "Start" : "Stop"}</button>
                    </div>
                    <p className="cui-text-muted">{state.training.description}</p>
                </div>
            </div>
        }
    </>);
}

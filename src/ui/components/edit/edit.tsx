import * as React from 'react'
import { useParams } from 'react-router-dom';
import { Training } from '../../../core/models';
import { NotFound } from '../common/NotFound';
import { RoundsList } from './list';

export interface EditState {
    training: Training;
}

export interface TrainingDetailsProps {
    training: Training;
}

export function Edit() {
    const { id } = useParams();
    const [state, setState] = React.useState<EditState>({
        training: null
    })
    React.useEffect(() => {
        const subscription = window.$flow.subscribe("GET_TRAINING")
        subscription.finish(onTraining);
        window.$flow.perform("GET_TRAINING", id)
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", subscription.id);
        }
    }, [id]);

    function onTraining(t: Training) {
        setState({
            training: t
        })
    }
    return (<div className="stopwatch-page-layout cui-accent">
        {
            state.training ? <TrainingDetails training={state.training} /> : <NotFound message="Training has not been found" classes="stopwatch-page-top cui-flex-center cui-dark" />
        }

    </div>);
}

export function TrainingDetails(props: TrainingDetailsProps) {
    return (<><div className="stopwatch-page-top cui-container cui-center">
        <div>
            <span className="cui-icon cui-dark" cui-icon="stopwatch"></span>
            <h1 className="cui-h1 cui-text-center cui-dark">{props.training.name}</h1>
        </div>
    </div>
        <div className="stopwatch-page-bottom cui-card cui-overflow-y-auto" cui-offset="offsetY: 100; action: .cui-active">
            <div className="cui-card-header">
                <span className="cui-card-title cui-text-muted">Rounds</span>
            </div>
            <div className="cui-card-body">
                <RoundsList rounds={props.training.rounds} />
            </div>
        </div></>);
}


// export function NotFound() {
//     return (<div className="stopwatch-page-top cui-flex-center cui-dark">
//         <h2 className="cui-h2">Training has not been found</h2>
//     </div>);
// }

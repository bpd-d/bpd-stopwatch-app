import * as React from 'react'
import { useParams, withRouter } from 'react-router-dom';
import { ElementManager } from '../../../../node_modules/cui-light/dist/index';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { showMessage, validateTraining } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { NotFound } from '../common/NotFound';
import { EditRoundDialog } from './EditRoundDialog';
import { EditRoundListItem } from './EditRoundListItem';

export interface EditTrainingSectionProps {
    training: Training;
    onSave: (training: Training) => void;
    onCancel: () => void;
}


export interface EditTrainingProps {
    history: any;
}

interface EditTrainingState {
    training: Training;
}

interface EditTrainingSectionState {
    training: Training;

    currentIndex: number;
    currentRound: Round;
}

interface EditTrainingDefinedActions {
    actions: StopwatchAction[];
}

function EditTraining(props: EditTrainingProps) {
    const [state, setState] = React.useState<EditTrainingState>({
        training: {
            name: "",
            rounds: []
        }
    })

    const { id } = useParams();


    function getTraining() {
        if (id) {
            window.$flow.perform("GET_TRAINING", id);
        }
    }

    function onUpdateTraining(result: boolean): void {
        if (!result) {
            showMessage("Fail", "Training was not saved")
        } else {
            if (props.history) {
                props.history.goBack();
            }
        }
    }

    function onCancel() {
        if (props.history) {
            props.history.goBack();
        }
    }

    function onGetTraining(training: Training): void {
        if (training) {
            setState({
                training: { ...training }
            })
        } else {
            showMessage("Fail", "Training was not found")
        }
    }



    function saveTraining(training: Training) {
        window.$flow.perform("UPDATE_TRAINING", training)
    }

    React.useEffect(() => {
        console.log("Parent redraw")
        const updateTrainingSub = window.$flow.subscribe("UPDATE_TRAINING", { finish: onUpdateTraining })
        const getTrainingSub = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })

        getTraining();

        return () => {
            window.$flow.unsubscribe("UPDATE_TRAINING", updateTrainingSub.id);
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSub.id);

        }
    }, [state.training.id])

    return (<>
        <div className="cui-container stopwatch-content-width">
            <div className="stopwatch-page-top cui-container cui-center">
                <div>
                    <h1 className="cui-h1 cui-text-center">Define training</h1>
                    <p className="cui-text-center">Customize your training settings</p>
                </div>
            </div>
        </div>
        <div className="">
            {state.training ?
                <EditTrainingSection training={state.training} onSave={saveTraining} onCancel={onCancel} /> :
                <NotFound message="The training you looking for could not be found" classes="" />}
        </div>
    </>);
}


function EditTrainingSection(props: EditTrainingSectionProps) {
    const [state, setState] = React.useState<EditTrainingSectionState>({
        training: props.training,
        currentIndex: -1,
        currentRound: null
    })

    const [definedActions, setDefinedActions] = React.useState<EditTrainingDefinedActions>({
        actions: []
    })


    function onRoundEdit(round: Round, index: number) {
        setState({
            ...state,
            currentIndex: index,
            currentRound: round
        })
        window.$cui.get("#edit-round-dialog").emit("open")
        //rounds[index] = 
    }

    function onRoundDelete(round: Round, index: number) {
        window.$cui.alert("delete-round-dialog", "YesNoCancel", {
            title: "Delete round",
            message: "Do you really want to delete this round?",
            onYes: () => {
                let rounds = [...state.training.rounds]
                rounds.splice(index, 1)
                updateRoundsState(rounds)
            }
        })
    }

    function onTrainingSave() {
        if (props.onSave) {
            if (validateTraining(state.training)) {
                props.onSave(state.training)
            } else {
                showMessage("Training not valid", "Training name is missing, please fill it up!")
            }

        }
    }

    function onRoundSave(round: Round, index: number) {
        let rounds = []
        if (index > -1) {
            rounds = [...state.training.rounds];
            rounds[index] = round;

        } else {
            rounds = [...state.training.rounds, round];
        }

        updateRoundsState(rounds);
        window.$cui.get("#edit-round-dialog").emit("close");
    }

    function updateRoundsState(rounds: Round[]) {
        setState({
            ...state,
            training: {
                ...state.training,
                rounds: rounds
            }
        })
    }

    function onFormChange(ev: any) {
        let name = ev.target.name;
        if (['name', 'description'].includes(name)) {
            setState({
                ...state,
                training: {
                    ...state.training,
                    [name]: ev.target.value
                }
            })
        }
    }

    function getDefinedActions(actions: StopwatchAction[]) {
        setDefinedActions({
            actions: [...DefaultActions, ...actions]
        })
    }

    React.useEffect(() => {
        console.log("Edit redraw")

        const getDefinedActionsSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: getDefinedActions });
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        setState({
            ...state,
            training: props.training
        })
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getDefinedActionsSub.id)
        }
    }, [props])

    return (<>
        <div className="cui-container stopwatch-content-width cui-flex-grid cui-child-width-1-1 cui-child-width-1-2--m">
            <div className="cui-padding-small-right">
                <h3 className="cui-h3 cui-text-muted">Common</h3>
                <div className="cui-form">
                    <label htmlFor="" className="cui-form-label">Name</label>
                    <input type="text" className="cui-input" placeholder="Name" name="name" value={state.training.name} onChange={onFormChange} />
                </div>
                <div className="cui-form cui-margin-top">
                    <label htmlFor="" className="cui-form-label">Description</label>
                    <textarea className="cui-textarea" placeholder="Description" name="description" rows={5} value={state.training.description} onChange={onFormChange}></textarea>
                </div>
            </div>
            <div className="cui-padding-small-left">
                <h3 className="cui-h3 cui-text-muted">Rounds (total count: {state.training.rounds.length})</h3>
                <ul className="cui-list">
                    {state.training && state.training.rounds.map((round: Round, index: number) => {
                        return <li key={index}><EditRoundListItem index={index} round={round} onEdit={onRoundEdit} onDelete={onRoundDelete} /></li>
                    })}
                    <li>
                        <button className="cui-button cui-icon cui-width-1-1" cui-icon="plus" onClick={() => {
                            onRoundEdit(null, -1);
                        }}><span className="cui-margin-small-left">Add New</span></button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="cui-container stopwatch-content-width cui-flex cui-right">
            <button className="cui-button cui-margin-small-right" onClick={() => { props.onCancel() }}>Cancel</button>
            <button className="cui-button cui-accent" onClick={onTrainingSave}>Save</button>
        </div>
        <EditRoundDialog index={state.currentIndex} round={state.currentRound} onSave={onRoundSave} definedActions={definedActions.actions} />
    </>);
}

export default withRouter(EditTraining);
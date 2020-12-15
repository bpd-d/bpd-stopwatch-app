import * as React from 'react'
import { Link, useParams, withRouter } from 'react-router-dom';
import { clone, is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { insert, move, showMessage } from '../../../core/helpers';
import { Round, StopwatchAction, Training } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { TrainingValidator } from '../../../core/validators';
import { MAPPIGNS } from '../../routes';
import { deleteRoundConfirmDialog, onDeleteTrainingDialog } from '../common/Dialogs';
import { NotFound } from '../common/NotFound';
import { PageHeader } from '../common/PageHeader';
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
    currentCount: number;
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
            goBack();
        }
    }

    function goBack() {
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
            <PageHeader title={is(state.training?.name) ? "Update training " + state.training.name : "Define training"} description="Customize your training settings" />
        </div>
        <div className="">
            {state.training ?
                <EditTrainingSection training={state.training} onSave={saveTraining} onCancel={goBack} /> :
                <NotFound message="The training you looking for could not be found" classes="" />}
        </div>
    </>);
}


function EditTrainingSection(props: EditTrainingSectionProps) {
    const [state, setState] = React.useState<EditTrainingSectionState>({
        training: props.training,
        currentIndex: -1,
        currentCount: 0,
        currentRound: null
    })

    const [definedActions, setDefinedActions] = React.useState<EditTrainingDefinedActions>({
        actions: []
    })


    function onRoundEdit(round: Round, index: number) {
        setState({
            ...state,
            currentIndex: index,
            currentRound: round,
            currentCount: state.training && state.training.rounds ? state.training.rounds.length : 0
        })
        window.$cui.get("#edit-round-dialog").emit("open")
    }

    function onRoundDelete(round: Round, index: number) {
        deleteRoundConfirmDialog(() => {
            let rounds = [...state.training.rounds]
            rounds.splice(index, 1)
            updateRoundsState(rounds)
        })
    }

    function onRoundDown(round: Round, index: number) {
        updateRoundsState(move(state.training.rounds, index, index + 1))
    }


    function onRoundUp(round: Round, index: number) {
        updateRoundsState(move(state.training.rounds, index, index - 1))
    }


    function onRoundClone(round: Round, index: number) {
        let idx = index + 1;
        let cloned = clone(round);
        updateRoundsState(insert(state.training.rounds, idx, cloned))
    }


    function onTrainingSave() {
        if (props.onSave) {
            let validaton = new TrainingValidator().validate(state.training);
            if (validaton.status) {
                props.onSave(state.training)
            } else {
                showMessage("Training not valid", validaton.errors.join(", "))
            }

        }
    }

    function onRoundSave(round: Round, index: number) {
        updateRoundsState(updateOrInsertRound(round, index));
        window.$cui.get("#edit-round-dialog").emit("close");
    }

    function updateOrInsertRound(round: Round, index: number) {
        let rounds = []
        if (index > -1) {
            rounds = [...state.training.rounds];
            rounds[index] = round;
        } else {
            rounds = [...state.training.rounds, round];
        }
        return rounds;
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

    function onDeleteTrainingSub(result: boolean) {
        props.onCancel();
    }

    function onDeleteTraining() {
        onDeleteTrainingDialog(state.training.name, onYes)
    }

    function onYes() {
        window.$flow.perform("DELETE_TRAINING", state.training.id)
    }

    function getDefinedActions(actions: StopwatchAction[]) {
        setDefinedActions({
            actions: [...DefaultActions, ...actions]
        })
    }

    React.useEffect(() => {
        const deleteTraininSub = window.$flow.subscribe("DELETE_TRAINING", {
            finish: onDeleteTrainingSub
        })
        const getDefinedActionsSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: getDefinedActions });
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        setState({
            ...state,
            training: props.training
        })
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getDefinedActionsSub.id)
            window.$flow.unsubscribe("DELETE_TRAINING", deleteTraininSub.id);
        }
    }, [props.training])

    return (<>
        {state.training.id > -1 && <div className="cui-container cui-flex cui-right cui-middle stopwatch-content-width">
            <ul className="cui-list cui-inline">
                <li className="cui-padding-remove"><Link to={MAPPIGNS.renderUrl('perform', { id: state.training.id })} className="cui-icon cui-accent cui-icon-margin cui-margin-right" cui-icon="media_play">Run</Link></li>
                <li className="cui-padding-remove"><a className="cui-icon cui-icon-margin" cui-icon="trash" onClick={onDeleteTraining}>Delete</a></li>
            </ul>
        </div>}
        <div className="cui-container stopwatch-content-width cui-flex-grid cui-child-width-1-1 cui-child-width-1-2--m">
            <div className="cui-padding-small-right">
                <h3 className="cui-h3 cui-text-muted">Common</h3>
                <div className="cui-form">
                    <label htmlFor="" className="cui-form-label">Name</label>
                    <input type="text" className="cui-input stopwatch-input-width" placeholder="Name" name="name" value={state.training.name} onChange={onFormChange} />
                </div>
                <div className="cui-form cui-margin-top">
                    <label htmlFor="" className="cui-form-label">Description</label>
                    <textarea className="cui-textarea stopwatch-input-width stopwatch-text-area" placeholder="Description" name="description" rows={5} value={state.training.description} onChange={onFormChange}></textarea>
                </div>
            </div>
            <div className="cui-padding-small-left">
                <h3 className="cui-h3 cui-text-muted">Rounds (total count: {state.training.rounds.length})</h3>
                <ul className="cui-list">
                    {state.training && state.training.rounds.map((round: Round, index: number, arr: Round[]) => {
                        return <li key={index} className="animation-fade-in"><EditRoundListItem
                            index={index}
                            round={round}
                            onEdit={onRoundEdit}
                            onDelete={onRoundDelete}
                            onMoveUp={onRoundUp}
                            onMoveDown={onRoundDown}
                            onClone={onRoundClone}
                            isFirst={index === 0}
                            isLast={index === arr.length - 1} />
                        </li>
                    })}
                    <li>
                        <button className="cui-button cui-icon cui-icon-margin cui-width-1-1" cui-icon="plus" onClick={() => {
                            onRoundEdit(null, -1);
                        }}>Add New</button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="cui-container stopwatch-content-width cui-flex cui-right">
            <button className="cui-button cui-margin-small-right" onClick={() => { props.onCancel() }}>Cancel</button>
            <button className="cui-button cui-accent" onClick={onTrainingSave}>Save</button>
        </div>
        <EditRoundDialog index={state.currentIndex} round={state.currentRound} onSave={onRoundSave} currentCount={state.currentCount} definedActions={definedActions.actions} />
    </>);
}

export default withRouter(EditTraining);
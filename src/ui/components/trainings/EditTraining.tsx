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
import { ButtonBar, ButtonBarItemProps } from './ButtonBar';
import { EditRoundDialog } from './EditRoundDialog';
import { EditRoundListItem } from './EditRoundListItem';
import { IconLabel } from './IconLabel';

export interface EditTrainingSectionProps {
    training: Training;
    //   onSave: (training: Training) => void;
    onUpdate: (training: Training) => void;
    onCancel: () => void;
}


export interface EditTrainingProps {
    history: any;
}

interface EditTrainingState {
    training: Training;
}

interface EditTrainingSectionState {
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

    function onUpdate(training: Training) {
        setState({
            ...state,
            training: training
        }
        )
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

    function onTrainingSave() {
        let validaton = new TrainingValidator().validate(state.training);
        if (validaton.status) {
            window.$flow.perform("UPDATE_TRAINING", state.training)
        } else {
            showMessage("Training not valid", validaton.errors.join(", "))
        }
    }

    function onDeleteTraining() {
        onDeleteTrainingDialog(state.training.name, onYes)
    }

    function onYes() {
        window.$flow.perform("DELETE_TRAINING", state.training.id)
    }

    function onDeleteTrainingSub(result: boolean) {
        goBack();
    }

    function getButtonNavItems(): ButtonBarItemProps[] {
        const buttonNavItems: ButtonBarItemProps[] = [
            { icon: "close", label: "Cancel", onClick: () => { goBack() } },
        ]
        if (is(state.training.id)) {
            buttonNavItems.push({ icon: "media_play", label: "Run", onClick: () => { props.history.push(MAPPIGNS.renderUrl('perform', { id: state.training.id })) } },
                { icon: "trash", label: "Delete", onClick: () => { onDeleteTraining() } })
        }
        buttonNavItems.push({ icon: "checkmark", label: "Save", onClick: onTrainingSave, modifiers: "cui-rounded cui-success" });
        return buttonNavItems;
    }

    React.useEffect(() => {
        const updateTrainingSub = window.$flow.subscribe("UPDATE_TRAINING", { finish: onUpdateTraining })
        const getTrainingSub = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })
        const deleteTraininSub = window.$flow.subscribe("DELETE_TRAINING", {
            finish: onDeleteTrainingSub
        })
        getTraining();

        return () => {
            window.$flow.unsubscribe("UPDATE_TRAINING", updateTrainingSub.id);
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSub.id);
            window.$flow.unsubscribe("DELETE_TRAINING", deleteTraininSub.id);
        }
    }, [state.training.id])

    return (<>
        <div className="edit-container">
            <div className="edit-container-content cui-overflow-y-auto">
                <div className="cui-container stopwatch-content-width">
                    <PageHeader title={is(state.training?.name) ? "Update training " + state.training.name : "Define training"} description="Customize your training settings" />
                </div>
                <div className="">
                    {state.training ?
                        <EditTrainingSection training={state.training} onUpdate={onUpdate} onCancel={goBack} /> :
                        <NotFound message="The training you looking for could not be found" classes="" />}
                </div>
            </div>
            <div className="edit-container-bottom cui-padding-small-vertical">
                <div className="cui-container stopwatch-content-width cui-flex cui-middle cui-center cui-right--m">
                    <ButtonBar items={
                        getButtonNavItems()
                    } />
                </div>
            </div>
        </div>
    </>);
}

function EditTrainingSection(props: EditTrainingSectionProps) {
    const [state, setState] = React.useState<EditTrainingSectionState>({
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
            currentCount: props.training && props.training.rounds ? props.training.rounds.length : 0
        })
        window.$cui.get("#edit-round-dialog").emit("open")
    }

    function onRoundDelete(round: Round, index: number) {
        deleteRoundConfirmDialog(() => {
            let rounds = [...props.training.rounds]
            rounds.splice(index, 1)
            updateRoundsState(rounds)
        })
    }

    function onRoundDown(round: Round, index: number) {
        updateRoundsState(move(props.training.rounds, index, index + 1))
    }


    function onRoundUp(round: Round, index: number) {
        updateRoundsState(move(props.training.rounds, index, index - 1))
    }

    function onRoundClone(round: Round, index: number) {
        let idx = index + 1;
        let cloned = clone(round);
        updateRoundsState(insert(props.training.rounds, idx, cloned))
    }

    function onRoundSave(round: Round, index: number) {
        updateRoundsState(updateOrInsertRound(round, index));
        window.$cui.get("#edit-round-dialog").emit("close");
    }

    function updateOrInsertRound(round: Round, index: number) {
        let rounds = []
        if (index > -1) {
            rounds = [...props.training.rounds];
            rounds[index] = round;
        } else {
            rounds = [...props.training.rounds, round];
        }
        return rounds;
    }

    function updateRoundsState(rounds: Round[]) {
        props.onUpdate(
            {
                ...props.training,
                rounds: rounds
            }
        )
    }

    function onFormChange(ev: any) {
        let name = ev.target.name;
        if (['name', 'description'].includes(name)) {
            props.onUpdate({
                ...props.training,
                [name]: ev.target.value
            })
        }
    }

    function getDefinedActions(actions: StopwatchAction[]) {
        setDefinedActions({
            actions: [...DefaultActions, ...actions]
        })
    }

    React.useEffect(() => {

        const getDefinedActionsSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: getDefinedActions });
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        setState({
            ...state
        })
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getDefinedActionsSub.id)

        }
    }, [props.training])

    return (<>
        <div className="cui-container stopwatch-content-width cui-flex-grid cui-child-width-1-1 cui-child-width-1-2--m">
            <div className="cui-padding-small-right">
                {/* <h3 className="cui-h3 cui-text-muted">Common</h3> */}
                <div className="cui-form">
                    <label htmlFor="" className="cui-form-label">Name</label>
                    <input type="text" className="cui-input stopwatch-input-width" placeholder="Name" name="name" value={props.training.name} onChange={onFormChange} />
                </div>
                <div className="cui-form cui-margin-top">
                    <label htmlFor="" className="cui-form-label">Description</label>
                    <textarea className="cui-textarea stopwatch-input-width stopwatch-text-area" placeholder="Description" name="description" rows={5} value={props.training.description} onChange={onFormChange}></textarea>
                </div>
            </div>
            <div className="cui-padding-small-left">
                {/* <h3 className="cui-h3 cui-text-muted">Rounds (total count: {props.training.rounds.length})</h3> */}
                <ul className="cui-list">
                    {props.training && props.training.rounds.map((round: Round, index: number, arr: Round[]) => {
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
                        }}>Add New Round</button>
                    </li>
                </ul>
            </div>
        </div>
        <EditRoundDialog index={state.currentIndex} round={state.currentRound} onSave={onRoundSave} currentCount={state.currentCount} definedActions={definedActions.actions} />
    </>);
}

export default withRouter(EditTraining);
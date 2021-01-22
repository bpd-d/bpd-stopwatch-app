import * as React from 'react'
import { Link, useParams, withRouter } from 'react-router-dom';
import { ACTIONS } from '../../../app/flow/trainings';
import { clone, is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { insert, move, setNavbarTitle, setPageTitle, showMessage, showToast } from '../../../core/helpers';
import { Round, StopwatchAction, Training, TrainingState } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { TrainingValidator } from '../../../core/validators';
import { MAPPIGNS } from '../../routes';
import { onDeleteTrainingDialog } from '../common/Dialogs';
import { NotFound } from '../common/NotFound';
import { PageHeader } from '../common/PageHeader';
import { ButtonBar, ButtonBarItemProps } from './ButtonBar';
import { EditRoundDialog } from './EditRoundDialog';
import { EditRoundListItem } from './EditRoundListItem';
import { QuickRoundDialog } from './QuickRoundDialog';
import { Loading } from '../common/Loading';

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
    const [isLoading, setIsLoading] = React.useState(false);
    const [state, setState] = React.useState<EditTrainingState>({
        training: {
            name: "",
            rounds: [],
            state: TrainingState.NEW
        }
    })
    const [notFound, setNotFound] = React.useState(false);
    const { id } = useParams();


    function getTraining() {
        setIsLoading(true);
        if (id) {
            window.$flow.perform(ACTIONS.GET_FOR_EDIT, id);
        } else {
            window.$flow.perform(ACTIONS.GET_DRAFT);
        }
    }

    function onUpdate(training: Training) {
        pushDraft(training)
    }

    function onUpdateTraining(result: boolean): void {
        if (!result) {
            showMessage("Fail", "Training was not saved")
        } else {
            showToast("Saved");
            goBack();
        }
    }

    function goBack() {
        if (props.history) {
            props.history.goBack();
        }
    }

    function onGetTraining(training: Training): void {
        setIsLoading(false);
        if (training) {
            setPageTitle("Edit " + training.name);
            setState({
                training: { ...training }
            })
        } else {
            setNotFound(true);
            // showMessage("Fail", "Training was not found")
        }
    }

    function onGetDraft(training: Training) {
        setIsLoading(false);
        if (training && !is(training.id)) {
            setState({
                training: { ...training }
            })
        }
    }

    function pushDraft(training: Training) {
        window.$flow.perform(ACTIONS.SET_DRAFT, training);
        setState({
            training: { ...training, state: TrainingState.DRAFT }
        })
    }

    function onTrainingSave() {
        let validaton = new TrainingValidator().validate(state.training);
        if (validaton.status) {
            window.$flow.perform(ACTIONS.UPDATE_TRAINING, state.training)
        } else {
            showMessage("Training not valid", validaton.errors.join(", "))
        }
    }

    function onDeleteTraining() {
        if (is(state.training.id) && state.training.state === TrainingState.PUBLISH)
            onDeleteTrainingDialog(state.training.name, onYes)
        else {
            showToast("Draft removed");
            // For not published trainings
            window.$flow.perform(ACTIONS.CLEAR_DRAFT);
            goBack();
        }

    }

    function onYes() {
        window.$flow.perform("DELETE_TRAINING", state.training.id)
    }

    function onDeleteTrainingSub(result: boolean) {
        showToast("Removed");
        goBack();
    }

    function getButtonNavItems(): ButtonBarItemProps[] {
        const buttonNavItems: ButtonBarItemProps[] = [];
        //{ icon: "close", label: "Cancel", onClick: () => { goBack() } }];
        if (is(state.training.id)) {
            buttonNavItems.push({ icon: "media_play", label: "Run", onClick: () => { props.history.push(MAPPIGNS.renderUrl('perform', { id: state.training.id })) } })
        }

        if (state.training.state !== TrainingState.NEW) {
            buttonNavItems.push({ icon: "trash", label: "Delete", onClick: () => { onDeleteTraining() } });
        }

        buttonNavItems.push({ icon: "checkmark", label: "Save", onClick: onTrainingSave, modifiers: "cui-success" });
        return buttonNavItems;
    }

    function getPageName(): string {
        if (!is(state.training) || !is(state.training.name)) {
            return "Define training";
        }

        return `Update ${state.training.state === TrainingState.DRAFT ? "draft" : "training"} ${state.training.name}`;
    }

    React.useEffect(() => {
        setPageTitle("Edit training");
        setNavbarTitle("Edit training");
        const updateTrainingSub = window.$flow.subscribe("UPDATE_TRAINING", { finish: onUpdateTraining })
        const getTrainingSub = window.$flow.subscribe(ACTIONS.GET_FOR_EDIT, { finish: onGetTraining })
        const getDraftSub = window.$flow.subscribe("GET_DRAFT", { finish: onGetDraft })
        const deleteTraininSub = window.$flow.subscribe("DELETE_TRAINING", {
            finish: onDeleteTrainingSub
        })
        getTraining();

        return () => {
            window.$flow.unsubscribe("UPDATE_TRAINING", updateTrainingSub.id);
            window.$flow.unsubscribe(ACTIONS.GET_FOR_EDIT, getTrainingSub.id);
            window.$flow.unsubscribe("DELETE_TRAINING", deleteTraininSub.id);
            window.$flow.unsubscribe("GET_DRAFT", getDraftSub.id);
        }
    }, [state.training.id])


    if (isLoading) {
        return <Loading />
    } else if (notFound) {
        return <NotFound message="The training you looking for could not be found" classes="" />
    } else if (!state.training) {
        return <span></span>;
    }
    return (<>
        <div className="edit-container">
            <div className="edit-container-content cui-overflow-y-auto">
                <PageHeader title={getPageName()} description="Customize your training settings" icon="dumbbell" />
                <EditTrainingSection training={state.training} onUpdate={onUpdate} onCancel={goBack} />
            </div>
            <div className="edit-container-bottom cui-padding-small-vertical cui-border-top cui-border-remove--l cui-flex stopwatch-content-width">
                <div className="stopwatch-content-width cui-flex cui-middle cui-center">
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
        let rounds = [...props.training.rounds]
        rounds.splice(index, 1)
        updateRoundsState(rounds)
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

    function OnQuickRoundClick() {
        window.$cui.get("#quick-round-create").emit("open")
    }

    function onQuickRoundSave(round: Round) {
        updateRoundsState(updateOrInsertRound(round, -1));
        window.$cui.get("#quick-round-create").emit("close");
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
                        <div className="cui-flex-grid cui-center cui-child-width-1-2--m">
                            <div className="">
                                <button className="cui-button cui-default cui-icon cui-icon-margin cui-width-1-1" cui-icon="plus" onClick={() => {
                                    onRoundEdit(null, -1);
                                }}>Add Round</button>
                            </div>
                            <div>
                                <button className="cui-button cui-accent cui-icon cui-icon-margin cui-width-1-1" cui-icon="bolt" onClick={OnQuickRoundClick}>Quick Round</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <EditRoundDialog index={state.currentIndex} round={state.currentRound} onSave={onRoundSave} currentCount={state.currentCount} definedActions={definedActions.actions} />
        <QuickRoundDialog id="quick-round-create" actions={definedActions.actions} onSave={onQuickRoundSave} />
    </>);
}

export default withRouter(EditTraining);
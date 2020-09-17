import * as React from 'react'
import { StopwatchAction, StopwatchActionType } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { BpdDialog } from '../common/BpdDialog';
import { validateStopwatchAction } from '../../../core/helpers';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { BpdActionIcon } from '../common/BpdActionIcon';

export interface BpdDialogState {
    action: StopwatchAction;
}

export interface StopWatchActionsState {
    actions: StopwatchAction[];
    current: StopwatchAction;
}

export interface AddActionDialogProps {
    action: StopwatchAction;
    onSave: (action: StopwatchAction) => void;
}

export function StopwatchActionsComponent() {
    const [state, setState] = React.useState<StopWatchActionsState>({
        actions: [...DefaultActions],
        current: null
    })



    function onDialogSave(action: StopwatchAction) {
        if (validateStopwatchAction(action)) {
            window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.SET_ACTION, action);
        }
    }

    function onDelete(action: StopwatchAction) {
        window.$cui.alert("delete-action-dialog", "YesNoCancel", {
            title: "Delete action",
            message: "Do you really want to delete action: " + action.name,
            onYes: () => {
                window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, action);
            }
        })
    }

    function onGetAll(actions: StopwatchAction[]) {
        setState({
            ...state,
            actions: [...DefaultActions, ...actions]
        })
    }

    function onAddOrEditClick(action?: StopwatchAction) {
        setState({
            ...state,
            current: action
        })
        let dialogCui = window.$cui.get("#add-action-dialog");
        dialogCui.emit('open');

    }

    React.useEffect(() => {
        const getAllSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: onGetAll })
        const setActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION)
        const removeActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION)
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getAllSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION, setActionSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, removeActionSub.id);
        }
    }, [state.actions])

    return (<><div className="cui-container stopwatch-content-width">
        <div className="stopwatch-page-header cui-container cui-center">
            <div>
                <h1 className="cui-h1 cui-text-center">Activities</h1>
                <p className="cui-text-center">Define activies which you want to perform in trainings!</p>
            </div>
        </div>
        <div className="cui-margin-top cui-flex-grid cui-flex-grid-match cui-child-width-1-1-s cui-child-width-1-3--m" cui-item-height="130px">
            {state.actions && state.actions.map((action: StopwatchAction, index: number) => {
                return (
                    <div key={index}>
                        <div className="cui-card cui-default">
                            <div className="cui-card-header cui-flex cui-between">
                                <span className="cui-card-title">{action.name}</span>
                                <BpdActionIcon type={action.type} />
                            </div>
                            <div className="cui-card-body">
                                <div className="cui-flex cui-middle">
                                    <div className="cui-flex-grow">
                                        <div>Duration: <span>{action.duration} seconds</span></div>
                                    </div>
                                    <div className="cui-flex-shrink">
                                        <ul className="cui-icon-nav">
                                            {action.editable && <li><a className="cui-icon" cui-icon="edit" onClick={() => onAddOrEditClick(action)}></a></li>}
                                            {action.removable && <li><a className="cui-icon" cui-icon="trash" onClick={() => onDelete(action)}></a></li>}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>)
            })}
            <div className="actions-add-new-button">
                <div className="cui-flex-center cui-card">
                    <button className="cui-icon cui-button" cui-icon="plus" onClick={() => { onAddOrEditClick() }}><span className="cui-margin-small-left"> Add new</span></button>
                </div>

            </div>
        </div>
    </div>
        <AddActionDialog action={state.current} onSave={onDialogSave} /></>);
}


export function AddActionDialog(props: AddActionDialogProps) {
    const [state, setState] = React.useState<StopwatchAction>({
        name: "",
        duration: 5,
        removable: true,
        editable: false,
        type: StopwatchActionType.EXERCISE
    })


    function onValueChange(event: any) {
        let name = event.target.name;

        switch (name) {
            case "name":
            case "duration":
            case "type":
                setState({ ...state, [name]: event.target.value })
                break;
            case "removable":
            case "editable":
                setState({ ...state, [name]: event.target.checked })
                break;
        }
    }

    function onSave() {
        if (props.onSave) {
            let dialogCui = window.$cui.get("#add-action-dialog");
            props.onSave({ ...state });
            dialogCui.emit('close');
        }
    }

    React.useEffect(() => {
        if (props.action) {
            setState({
                ...props.action
            })
        }
        return () => {

        }
    }, [props.action])
    return (<BpdDialog
        title="Add new"
        id="add-action-dialog"
        body={<>
            <div className="cui-form">
                <label className="cui-form-label">Name</label>
                <input className="cui-input" type="text" name="name" value={state.name} placeholder="Name" onChange={onValueChange} />
            </div>
            <div className="cui-form cui-margin-top">
                <label className="cui-form-label">Duration</label>
                <input className="cui-input" type="number" min="0" max="100" name="duration" value={state.duration} placeholder="Duration" onChange={onValueChange} />
            </div>
            <div className="cui-form cui-margin-top">
                <label className="cui-form-label">Type</label>
                <select className="cui-select" value={state.type} name="type" onChange={onValueChange} >
                    <option value="warmup">Warmup</option>
                    <option value="exercise">Exercise</option>
                    <option value="break">Break</option>
                    <option value="cooldown">Cooldown</option>
                </select>
            </div>
            <div className="cui-form cui-margin-top">
                <input type="checkbox" className="cui-checkbox" id="checkbox-1-1" name="removable" checked={state.removable} onChange={onValueChange} />
                <label htmlFor="checkbox-1-1"> Removable</label>
            </div>
            <div className="cui-form cui-margin-top">
                <input type="checkbox" className="cui-checkbox" id="checkbox-1-2" name="editable" checked={state.editable} onChange={onValueChange} />
                <label htmlFor="checkbox-1-2"> Editable</label>
            </div>
        </>
        }
        footer={
            <div className="cui-flex cui-right">
                <button className="cui-button cui-default cui-margin-small-right" cui-close="">Cancel</button>
                <button className="cui-button cui-accent" onClick={onSave}>Save</button>
            </div>
        }
    />);
}

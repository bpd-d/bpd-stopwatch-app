import * as React from 'react'
import { StopwatchAction, StopwatchActionType } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { BpdDialog } from '../common/dialog';
import { validateStopwatchAction } from '../../../core/helpers';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';

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
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, action);
    }

    function onGetAll(actions: StopwatchAction[]) {
        setState({
            ...state,
            actions: [...DefaultActions, ...actions]
        })
    }

    function onSetOrRemove(flag: boolean) {

    }

    React.useEffect(() => {
        const getAllSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: onGetAll })
        const setActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION, { finish: onSetOrRemove })
        const removeActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, { finish: onSetOrRemove })
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getAllSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION, setActionSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, removeActionSub.id);
        }
    }, [state.actions])

    return (<><div className="cui-container stopwatch-content-width">
        <div>
            <button className="cui-button cui-accent" cui-open="target: #add-action-dialog">Add new</button>
        </div>
        <table className="cui-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {state.actions && state.actions.map((action: StopwatchAction, index: number) => {
                    return (<tr key={index}>
                        <td>{action.name}</td>
                        <td>{action.type}</td>
                        <td>{action.duration}</td>
                        <td className="cui-flex cui-right">
                            <ul className="cui-icon-nav">
                                {action.editable && <li><a href="#" className="cui-icon" cui-icon="edit"></a></li>}
                                {action.removable && <li><a href="#" className="cui-icon" cui-icon="trash" onClick={() => onDelete(action)}></a></li>}
                            </ul>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>

    </div>
        <AddActionDialog action={state.current} onSave={onDialogSave} /></>);
}


export function AddActionDialog(props: AddActionDialogProps) {
    const [state, setState] = React.useState<StopwatchAction>({
        name: "",
        duration: 0,
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
            let dialogCui = window.$cui.get("#add-action-dialog")
            props.onSave({ ...state });
            dialogCui.emit('close');
        }
    }

    React.useEffect(() => {

        return () => {

        }
    })
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

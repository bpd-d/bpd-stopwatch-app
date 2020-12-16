import * as React from "react";
import { StopwatchAction, StopwatchActionType } from "../../../core/models";
import { ActionValidator } from "../../../core/validators";
import { BpdDialog } from "../common/BpdDialog";
import { ErrorsList } from "../common/ErrorsList";

export interface AddActionDialogProps {
    action: StopwatchAction;
    onSave: (action: StopwatchAction) => void;
}

export function AddActionDialog(props: AddActionDialogProps) {
    const [state, setState] = React.useState<StopwatchAction>({
        id: undefined,
        name: "",
        duration: "5",
        removable: true,
        editable: false,
        type: StopwatchActionType.EXERCISE
    })

    const [errors, setErrors] = React.useState<string[]>([])

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
            let action: StopwatchAction = { ...state };
            let actionValidator = new ActionValidator().validate(action)
            if (actionValidator.status) {
                let dialogCui = window.$cui.get("#add-action-dialog");
                props.onSave(action);
                dialogCui.emit('close');
            }
            setErrors(actionValidator.errors);
        }
    }

    React.useEffect(() => {
        if (props.action) {
            setState({
                ...props.action
            })
            setErrors([]);
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
                <input className="cui-input stopwatch-input-width" type="text" name="name" value={state.name} placeholder="Name" onChange={onValueChange} />
            </div>
            <div className="cui-form cui-margin-top">
                <label className="cui-form-label">Duration</label>
                <input className="cui-input stopwatch-input-width" type="number" min="0" max="100" name="duration" value={state.duration} placeholder="Duration" onChange={onValueChange} />
            </div>
            <div className="cui-form cui-margin-top">
                <label className="cui-form-label">Type</label>
                <select className="cui-select stopwatch-input-width" value={state.type} name="type" onChange={onValueChange} >
                    <option value="warmup">Warmup</option>
                    <option value="exercise">Exercise</option>
                    <option value="break">Break</option>
                    <option value="cooldown">Cooldown</option>
                </select>
            </div>
            <div className="cui-form cui-flex cui-middle cui-reverse cui-margin-top">
                <input type="checkbox" className="cui-checkbox" id="checkbox-1-2" name="editable" checked={state.editable} onChange={onValueChange} />
                <label htmlFor="checkbox-1-2"> Editable</label>
            </div>
            <div className="cui-form cui-flex cui-middle cui-reverse cui-margin-top">
                <input type="checkbox" className="cui-checkbox" id="checkbox-1-1" name="removable" checked={state.removable} onChange={onValueChange} />
                <label htmlFor="checkbox-1-1"> Removable</label>
            </div>
            <ErrorsList errors={errors} />
        </>
        }
        footer={
            <div className="cui-flex cui-right">
                <button className="cui-button cui-margin-small-right" cui-close="">Cancel</button>
                <button className="cui-button cui-accent" onClick={onSave}>Save</button>
            </div>
        }
    />);
}
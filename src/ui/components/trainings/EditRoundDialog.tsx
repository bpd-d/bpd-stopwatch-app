import * as React from "react";
import { useState } from "react";
import { ACTIONS_FLOW_ACTIONS } from "../../../app/flow/actions";
import { Round, StopwatchAction } from "../../../core/models";
import { RoundValidator } from "../../../core/validators";
import { ActionsSelect } from "../actions/ActionsSelect";
import { BpdActionIcon } from "../common/BpdActionIcon";
import { BpdDialog } from "../common/BpdDialog";

export interface EditRoundDialogProps {
    onSave: (round: Round, index: number) => void;
    definedActions: StopwatchAction[];
    round: Round;
    index: number;
}

export interface EditRoundDialogState {
    actions?: StopwatchAction[];
    selected: StopwatchAction;
    errors: string[];
}

export function EditRoundDialog(props: EditRoundDialogProps) {
    const [state, setState] = useState<EditRoundDialogState>({
        actions: [],
        selected: null,
        errors: []
    })

    function onSave() {
        if (props.onSave) {
            let round: Round = { actions: [...state.actions] }
            let validation = new RoundValidator().validate(round);
            if (validation.status) {
                props.onSave(round, props.index);
                return;
            }
            setState({
                ...state,
                errors: validation.errors
            })

        }
    }

    function onActionSelectChange(action: StopwatchAction) {
        if (action) {
            setState({
                ...state,
                selected: action
            })
        }
    }

    function onAddAction() {
        if (state.selected) {
            setActions([...state.actions, state.selected])
        }
    }

    function onDeleteAction(index: number) {
        let newActions = [...state.actions];
        newActions.splice(index, 1);
        setActions(newActions)
    }

    function setActions(actions: StopwatchAction[]) {
        setState({
            actions: actions,
            selected: props.definedActions[0],
            errors: []
        })
    }
    React.useEffect(() => {
        setActions(props.round && props.round !== null ? props.round.actions : []);

        return () => {
        }
    }, [props.round, props.definedActions])
    return (<BpdDialog
        id="edit-round-dialog"
        title="Edit Round"
        body={<>
            <div className="edit-round-dialog-body">
                <ul className="cui-list">
                    {state.actions && state.actions.map((item: StopwatchAction, index: number) => {
                        return <li key={index} className="animation-fade-in" >
                            <div className="cui-flex cui-middle">
                                <div className="cui-flex-grow">
                                    <div className="cui-flex cui-middle">
                                        <div className="cui-flex-center cui-margin-right">
                                            <BpdActionIcon type={item.type} />
                                        </div>
                                        <div className="cui-flex-grow">
                                            <div className="">{item.name}</div>
                                            <div className="cui-text-muted">Lasts {item.duration} seconds</div>
                                        </div>
                                    </div>

                                </div>
                                <ul className="cui-icon-nav">
                                    <li><a className="cui-icon" cui-icon="trash" onClick={() => { onDeleteAction(index) }}></a></li>
                                </ul>
                            </div>
                        </li>
                    })}
                    <li>
                        <div className="cui-flex cui-middle cui-nowrap">
                            <div className="cui-flex-grow">
                                <ActionsSelect id="round-action-select" className="cui-width-1-2" name="action" value={state.selected?.name} actions={props.definedActions} onSelect={onActionSelectChange} />
                            </div>
                            <div className="">
                                <a cui-icon="plus" className="cui-icon-button" onClick={onAddAction}></a>
                            </div>
                        </div>
                    </li>
                </ul>
                {state.errors && state.errors.length > 0 && <ul className="cui-list ">
                    {state.errors.map((error: string, index: number) => {
                        return <li key={index} className="cui-animation-slide-in"><span className="cui-text-error">{error}</span></li>
                    })}
                </ul>}
            </div>
        </>
        }
        footer={
            <div className="cui-flex cui-right" >
                <button className="cui-button cui-margin-small-right" cui-close="">Cancel</button>
                <button className="cui-button cui-accent" onClick={onSave}>Save</button>
            </div >
        }
    />)
}
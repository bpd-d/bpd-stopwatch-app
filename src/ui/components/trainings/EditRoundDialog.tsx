import * as React from "react";
import { useState } from "react";
import { is } from "../../../../node_modules/bpd-toolkit/dist/esm/index";
import { ACTIONS_FLOW_ACTIONS } from "../../../app/flow/actions";
import { Round, StopwatchAction } from "../../../core/models";
import { getDefaultRoundName } from "../../../core/statics";
import { RoundValidator } from "../../../core/validators";
import { ActionSelectDropdown } from "../actions/ActionSelectDropdown";
import { ActionsSelect } from "../actions/ActionsSelect";
import { BpdActionIcon } from "../common/BpdActionIcon";
import { BpdDialog } from "../common/BpdDialog";

export interface EditRoundDialogProps {
    onSave: (round: Round, index: number) => void;
    definedActions: StopwatchAction[];
    round: Round;
    index: number;
    currentCount: number;
}

export interface EditRoundDialogState {
    name: string;
    actions?: StopwatchAction[];
    selected: StopwatchAction;
    errors: string[];
}

export function EditRoundDialog(props: EditRoundDialogProps) {
    const [state, setState] = useState<EditRoundDialogState>({
        actions: [],
        selected: null,
        errors: [],
        name: ""
    })

    function onSave() {
        if (props.onSave) {
            let round: Round = {
                actions: [...state.actions],
                name: state.name
            }
            let validation = new RoundValidator().validate(round);
            if (validation.status) {
                props.onSave(round, props.index);
                setState({
                    ...state,
                    name: getDefaultRoundName(props.currentCount + 1),
                    selected: null,
                    actions: []
                })
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
            setStateRoundData([...state.actions, state.selected])
        }
    }

    function onDeleteAction(index: number) {
        let newActions = [...state.actions];
        newActions.splice(index, 1);
        setStateRoundData(newActions)
    }

    function setStateRoundData(actions: StopwatchAction[], name?: string) {
        setState({
            actions: actions,
            selected: props.definedActions[0],
            errors: [],
            name: name ? name : state.name
        })
    }

    function roundNameUpdate(ev: any) {
        let name = ev.target.value;
        let errors = [];
        if (!is(name)) {
            errors.push("Name cannot be empty")
        }
        setState({
            ...state,
            errors: errors,
            name: name
        })
    }

    React.useEffect(() => {
        let name = props.round && props.round.name ? props.round.name : getDefaultRoundName(props.currentCount);
        let actions = is(props.round) ? props.round.actions : [];
        setStateRoundData(actions, name);

        return () => {
        }
    }, [props.round, props.definedActions, props.currentCount])
    return (<BpdDialog
        id="edit-round-dialog"
        title="Edit Round"
        body={<>
            <div className="">
                <div className="cui-form">
                    <label htmlFor="" className="cui-form-label">Round name</label>
                    <input type="text" className="cui-input" placeholder="Round name" value={state.name} onChange={roundNameUpdate} />
                </div>
                <div className="cui-margin-top">Actions</div>
                <ul className="cui-list cui-margin-top edit-round-dialog-body">
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
                </ul>
                <div className="cui-flex cui-middle cui-nowrap cui-margin-top">
                    <div className="cui-flex-grow">
                        <ActionSelectDropdown value={state.selected} actions={props.definedActions} onSelect={onActionSelectChange} name="actioonaa" id="round-select-drop" />
                    </div>
                    <div className="cui-padding-horizontal">
                        <button cui-icon="plus" className="cui-icon cui-icon-button cui-width-1-1" onClick={onAddAction}></button>
                    </div>
                </div>

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
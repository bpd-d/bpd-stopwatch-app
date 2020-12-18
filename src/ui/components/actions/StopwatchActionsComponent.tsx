import * as React from 'react'
import { StopwatchAction } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { BpdActionIcon } from '../common/BpdActionIcon';
import { AddActionDialog } from './AddActionDialog';
import { PageHeader } from '../common/PageHeader';
import { deleteActionConfirmDialog } from '../common/Dialogs';
import { getBgClassByType } from '../../../core/helpers';
import { is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { ClearableInput } from '../common/ClearableInput';
import { IconLabel } from '../trainings/IconLabel';

const defaultAction: StopwatchAction = {
    id: undefined,
    name: "",
    type: "exercise",
    duration: "5",
    removable: true,
    editable: true
}

export interface BpdDialogState {
    action: StopwatchAction;
}

export interface StopWatchActionsState {
    actions: StopwatchAction[];
    current: StopwatchAction;
}


export function StopwatchActionsComponent() {
    const [state, setState] = React.useState<StopWatchActionsState>({
        actions: [...DefaultActions],
        current: null
    })

    const [filter, setFilter] = React.useState<string>("");

    function onDialogSave(action: StopwatchAction) {
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.SET_ACTION, action);
    }

    function onDelete(action: StopwatchAction) {
        deleteActionConfirmDialog(action.name, () => {
            window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, action);
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
            current: action || { ...defaultAction }
        })
        let dialogCui = window.$cui.get("#add-action-dialog");
        dialogCui.emit('open');
    }

    function updateFilter(value: string) {
        setFilter(value);
    }

    function matchesName(name: string): boolean {
        if (!is(filter)) {
            return true;
        }
        let match = name.toLowerCase().match(filter.toLowerCase());
        return is(match);
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

    return (<><div className="stopwatch-content-width">
        <PageHeader title="Activities" description="Define activies which you want to perform in trainings!" />
        <div className="cui-container cui-flex cui-middle cui-middle cui-center cui-right--s">
            <ClearableInput value={filter} onUpdate={updateFilter} className="cui-width-1-1 cui-width-1-3--m cui-width-1-4--l" />
        </div>
        <div className="cui-container cui-flex-grid cui-flex-grid-match cui-child-width-1-2 cui-child-width-1-3--m">
            {is(state.actions) && state.actions.map((action: StopwatchAction, index: number) => {
                return (matchesName(action.name) &&
                    <div key={index} className="cui-animation-fade-in">
                        <div className={"cui-card cui-default " + getBgClassByType(action.type) + (action.editable ? " cui-hover" : "")} onClick={(ev) => { if (action.editable) { onAddOrEditClick(action); ev.preventDefault(); } }}>
                            <div className="cui-card-header cui-flex cui-between cui-nowrap">
                                <span className="cui-card-title cui-text-truncate cui-overflow-hidden">{action.name}</span>
                                <BpdActionIcon type={action.type} />
                            </div>
                            <div className="cui-card-body cui-flex cui-middle cui-nowrap action-card-height">
                                <div className="cui-flex-grow cui-overflow-hidden">
                                    <div className="cui-text-truncate"><span>{action.duration} seconds</span></div>
                                </div>
                                <div className="cui-flex-shrink">
                                    <ul className="cui-icon-nav">
                                        {action.removable && <li><a className="cui-icon" cui-icon="trash" onClick={(ev) => { onDelete(action); ev.stopPropagation(); }}><IconLabel label="Delete" /></a></li>}
                                        {!action.editable && <li><span className="cui-icon cui-muted" cui-icon="close"><IconLabel label="Not editable" /></span></li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
            })}
        </div>
        <div className="cui-position-float cui-position-bottom cui-position-right cui-margin cui-margin-large--l z-index-100">
            <button className="cui-icon-button cui-large cui-background-default cui-box-shadow" cui-icon="plus" onClick={() => { onAddOrEditClick() }}></button>
        </div>
    </div>
        <AddActionDialog action={state.current} onSave={onDialogSave} /></>);
}

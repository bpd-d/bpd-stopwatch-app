import * as React from 'react'
import { StopwatchAction } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { AddActionDialog } from './AddActionDialog';
import { PageHeader } from '../common/PageHeader';
import { setNavbarTitle, setPageTitle } from '../../../core/helpers';
import { is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { ClearableInput } from '../common/ClearableInput';
import { ActionsEditGrid } from './ActionsEditGrid';
import { MAPPIGNS } from '../../../ui/routes';
import { MainComponentBase } from '../common/MainComponentBase';

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

    const routeData = MAPPIGNS.getRoute('actions');

    const [filter, setFilter] = React.useState<string>("");

    function onDialogSave(action: StopwatchAction) {
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.SET_ACTION, action);
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
        setPageTitle(routeData.name);
        const getAllSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: onGetAll })
        const setActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION)
        const removeActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION)
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        return () => {
            //setNavbarTitle("");
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getAllSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION, setActionSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, removeActionSub.id);
        }
    }, [state.actions])

    return (<><div className="stopwatch-content-width">
        <MainComponentBase routeName="actions" >
            <div className="cui-container cui-flex cui-middle cui-middle cui-center cui-right--s">
                <ClearableInput value={filter} onUpdate={updateFilter} className="cui-width-1-1 cui-width-1-3--m cui-width-1-4--l" />
            </div>
            <ActionsEditGrid filter={filter} actions={state.actions} onEdit={onAddOrEditClick} onDelete={onDelete} />
            <div className="cui-position-float cui-position-bottom cui-position-center cui-margin-large-bottom app-float-bottom z-index-100">
                <button className="cui-icon-button cui-large cui-background-default cui-box-shadow" cui-icon="plus" onClick={() => { onAddOrEditClick() }}></button>
            </div>
        </MainComponentBase>
    </div>
        <AddActionDialog action={state.current} onSave={onDialogSave} /></>);
}
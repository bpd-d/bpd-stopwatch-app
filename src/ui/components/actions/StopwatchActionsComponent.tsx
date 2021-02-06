import * as React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { StopwatchAction } from '../../../core/models';
import { DefaultActions } from '../../../core/statics';
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { AddActionDialog } from './AddActionDialog';
import { is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';
import { ClearableInput } from '../common/ClearableInput';
import { ActionsEditGrid } from './ActionsEditGrid';
import { MainComponentBase } from '../common/MainComponentBase';
import { useSearchParams } from '../../../ui/hooks/SearchParams';

const PARAM_FILTER: string = 'filter'

const defaultAction: StopwatchAction = {
    id: undefined,
    name: "",
    type: "exercise",
    duration: "5",
    removable: true,
    editable: true
}

interface StopWatchActionsState {
    actions: StopwatchAction[];
    current: StopwatchAction;
}


export default function StopwatchActionsComponent() {
    const [state, setState] = React.useState<StopWatchActionsState>({
        actions: [...DefaultActions],
        current: null
    })
    const location = useLocation();
    const history = useHistory();
    const { searchParams, search } = useSearchParams(location);
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
        const params = new URLSearchParams();
        params.set(PARAM_FILTER, value);
        history.push({
            pathname: location.pathname,
            search: params.toString()
        })
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
        let value = searchParams.get(PARAM_FILTER);
        setFilter(value);
        const getAllSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, { finish: onGetAll })
        const setActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION)
        const removeActionSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION)
        window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.GET_ALL);
        return () => {
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.GET_ALL, getAllSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.SET_ACTION, setActionSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.REMOVE_ACTION, removeActionSub.id);
        }
    }, [search])

    return (<>
        <MainComponentBase routeName="actions" >
            <div key="search-input" className="cui-container cui-flex cui-middle cui-middle cui-center cui-right--s">
                <ClearableInput value={filter} onUpdate={updateFilter} className="cui-width-1-1 cui-width-1-3--m cui-width-1-4--l" />
            </div>
            <ActionsEditGrid key="actions-grid" filter={filter} actions={state.actions} onEdit={onAddOrEditClick} onDelete={onDelete} />
            <div key="btn-bar" className="cui-position-float cui-position-bottom cui-position-center cui-margin-large-bottom app-float-bottom z-index-100">
                <button className="cui-icon-button cui-large cui-background-default cui-box-shadow" cui-icon="plus" onClick={() => { onAddOrEditClick() }}></button>
            </div>
        </MainComponentBase>
        <AddActionDialog action={state.current} onSave={onDialogSave} /></>);
}
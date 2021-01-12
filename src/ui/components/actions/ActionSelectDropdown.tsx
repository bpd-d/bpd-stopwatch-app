import * as React from 'react'
import { StopwatchAction } from 'src/core/models';
import { BpdActionIcon } from '../common/BpdActionIcon';
import { BpdActionLabel } from '../common/BpdActionLabel';
import { ActionsSelectProps } from './ActionsSelect';

export function ActionSelectDropdown(props: ActionsSelectProps) {
    function onChange(action: StopwatchAction) {
        if (props.onSelect && (!props.value || props.value.id !== action.id)) {
            props.onSelect(action);
        }
        window.$cui.get("#" + props.id).emit("close");
    }

    return (<div className="cui-drop-trigger cui-block">
        <a className="cui-link cui-block">
            <DropTrigger action={props.value} />
        </a>
        <div className="cui-dropdown drop-height" cui-drop="outClose: Y;" id={props.id}>
            <ul className="cui-drop-nav drop-max-width">
                {props.actions && props.actions.map(action => {
                    return <li key={action.id}><a className="cui-overflow-hidden cui-text-truncate" onClick={() => { onChange(action) }}><BpdActionLabel action={action} /></a></li>
                })}
            </ul>
        </div>
    </div >);
}

interface DropTriggerProps {
    action: StopwatchAction;
}

export function DropTrigger(props: DropTriggerProps) {
    return (
        <div className="cui-flex cui-middle cui-width-1-1">
            <div className="cui-flex-grow">{props.action ? <BpdActionLabel action={props.action} /> : <span className="cui-inline-block cui-padding-small">No action selected</span>}</div>
            <span cui-icon="chevron_small_down"></span>
        </div>
    );
}


export function ActionDetailsLabel(props: DropTriggerProps) {
    return (<div className="cui-text-truncate cui-overflow-hidden cui-width-1-1">
        <div>
            <BpdActionIcon type={props.action.type} /><span className="cui-margin-small-left">{props.action.name}</span>
        </div>
        <div>
            <span className="cui-text-muted cui-text-small">(Duration {props.action.duration}s)</span>
        </div>
    </div>)

    {/* <BpdActionIcon type={props.action.type} /><span className="cui-margin-small-left">{props.action.name}</span><span className="cui-text-muted cui-margin-small-left">({props.action.duration}s)</span></div>) */ }
}
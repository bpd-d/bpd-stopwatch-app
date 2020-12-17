import * as React from 'react'
import { StopwatchAction } from 'src/core/models';
import { ActionsSelectProps } from './ActionsSelect';

export function ActionSelectDropdown(props: ActionsSelectProps) {
    function onChange(action: StopwatchAction) {
        if (props.onSelect && props.value.id !== action.id) {
            window.$cui.get("#" + props.id).emit("close");
            props.onSelect(action);
        }
    }

    return (<div className="cui-drop-trigger cui-block">
        <a className="cui-link cui-block">
            <DropTrigger action={props.value} />
        </a>
        <div className="cui-dropdown" cui-drop="outClose: Y;" id={props.id}>
            <ul className="cui-drop-nav drop-max-width">
                {props.actions && props.actions.map(action => {
                    return <li key={action.id}><a className="cui-overflow-hidden cui-text-truncate" onClick={() => { onChange(action) }}><ActionDetailsLabel action={action} /></a></li>
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
        <div className="cui-flex cui-width-1-1">
            {props.action ? <div className="cui-flex-grow"><ActionDetailsLabel action={props.action} /></div> : <span>No action selected</span>}
            <span cui-icon="chevron_down"></span>
        </div>
    );
}


export function ActionDetailsLabel(props: DropTriggerProps) {
    return (<span className="cui-text-truncate"><span>{props.action.name}</span><span className="cui-text-muted cui-margin-small-left">({props.action.duration}s)</span></span>)
}
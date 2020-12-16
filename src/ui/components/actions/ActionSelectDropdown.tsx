import * as React from 'react'
import { StopwatchAction } from 'src/core/models';
import { ActionsSelectProps } from './ActionsSelect';

export function ActionSelectDropdown(props: ActionsSelectProps) {

    function onChange(action: StopwatchAction) {
        if (props.onSelect && props.value !== action.name) {
            props.onSelect(action);
        }
    }

    return (<div className="cui-drop-trigger">
        <button className="cui-button cui-default">{props.value}</button>
        <div className="cui-dropdown " cui-drop="pos: top-left">
            <ul className="cui-drop-nav">
                {props.actions && props.actions.map(action => {
                    return <li key={action.id}><a onClick={() => { onChange(action) }}>{action.name}</a></li>
                })}
            </ul>
        </div>
    </div>);
}

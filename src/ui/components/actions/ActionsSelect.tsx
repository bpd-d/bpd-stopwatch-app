import * as React from 'react'
import { StopwatchAction } from '../../../core/models';
export interface ActionsSelectProps {
    actions: StopwatchAction[];
    id: string;
    name: string;
    className?: string;
    value?: string;
    onSelect: (action: StopwatchAction) => void;
}
export function ActionsSelect(props: ActionsSelectProps) {
    function onChange(ev: any) {
        if (props.onSelect) {
            let name = ev.target.value;
            props.onSelect(props.actions.find(item => item.name === name))
        }
    }
    return (
        <select className={"cui-select " + props.className} name={props.name} id={props.id} onChange={onChange} value={props.value}>
            {props.actions && props.actions.map((action: StopwatchAction) => {
                return <option key={action.name} value={action.name}>{action.name} (Type: {action.type}, Duration: {action.duration})</option>
            })}
        </select>
    );
}

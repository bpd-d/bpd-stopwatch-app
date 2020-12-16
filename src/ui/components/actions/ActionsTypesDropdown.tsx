import { is } from 'node_modules/bpd-toolkit/dist/esm/index';
import * as React from 'react'
import { StopwatchAction } from 'src/core/models';
import { ElementManager } from '../../../../../cui-light/dist/esm/managers/element';

export interface ActionsDropProps {
    id: string;
    value: string;
    onChange: (action: string) => void;
}

export function ActionsDrop(props: ActionsDropProps) {
    let man: ElementManager = null;
    function update(action: string) {
        if (props.onChange && action !== props.value) {
            window.$cui.get("#" + props.id).emit("close");
            props.onChange(action);
        }
    }

    React.useEffect(() => {
        man = window.$cui.get("#" + props.id)
        return () => {
        }
    }, [props.value])
    return (<div className="cui-drop-trigger">
        <a className="cui-button">{props.value}</a>
        <div className="cui-dropdown " cui-drop="pos: top-left" id={props.id}>
            <ul className="cui-drop-nav">
                <li><a onClick={() => { update("warmup") }}>Warmup</a></li>
                <li><a onClick={() => { update("break") }}>break</a></li>
                <li><a onClick={() => { update("exercise") }}>exercise</a></li>
                <li><a onClick={() => { update("cooldown") }}>cooldown</a></li>
            </ul>
        </div>
    </div>);
}

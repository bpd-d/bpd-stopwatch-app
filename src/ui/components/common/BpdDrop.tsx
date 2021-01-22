import { is } from 'bpd-toolkit/dist/esm/index';
import * as React from 'react'
import { ElementManager } from 'cui-light/dist/esm/managers/element';

export interface BpdDropProps {
    id: string;
    value: string;
    name?: string;
    items: string[];
    onChange?: (name: string, value: string) => void;
    modifiers?: string;
}

export function BpdDrop(props: BpdDropProps) {
    const dropRef = React.useRef<ElementManager>(undefined);
    function onChange(value: string) {
        if (dropRef.current) {
            dropRef.current.emit("close");
        }
        if (props.onChange && value !== props.value) {
            props.onChange(props.name, value);
        }
    }

    let modifiers = !props.modifiers ? "" : " " + props.modifiers;

    React.useEffect(() => {
        if (!is(props.id)) {
            throw new Error("Drop component id was not provieded, but is required!");
        }
        dropRef.current = window.$cui.get("#" + props.id);
    })

    return (<div className={"cui-drop-trigger cui-block" + modifiers}>
        <a className="cui-link cui-flex cui-middle cui-width-1-1 cui-padding-small">
            <span className="cui-flex-grow cui-text-capital cui-margin-right">{props.value}</span>
            <span cui-icon="chevron_small_down"></span>
        </a>
        <div className="cui-dropdown drop-height" cui-drop="outClose: Y;autoClose: Y" id={props.id}>
            <ul className="cui-drop-nav drop-max-width">
                {props.items && props.items.map((item, index) => {
                    return <li key={item + index}><a className="cui-overflow-hidden cui-text-truncate cui-text-capital" onClick={() => { onChange(item) }}>{item}</a></li>
                })}
            </ul>
        </div>
    </div >);
}

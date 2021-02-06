import * as React from 'react'
import { is } from '../../../../node_modules/bpd-toolkit/dist/esm/index';

export interface ClearableInputProps {
    value: string;
    onUpdate?: (value: string) => void;
    className?: string;
}


export function ClearableInput(props: ClearableInputProps) {
    function onInputChange(ev: any) {
        changeValue(ev.target.value);
    }

    function changeValue(value: string) {
        if (is(props.onUpdate)) {
            props.onUpdate(value);
        }
    }

    React.useEffect(() => {
    }, [props.value])

    return (<div className={"cui-input-mix " + props.className}>
        <input type="text" className="cui-input" placeholder="Filter" value={props.value} onChange={onInputChange} />
        {is(props.value) && <a className="cui-icon" cui-icon="close" onClick={() => changeValue("")}></a>}
    </div>);
}

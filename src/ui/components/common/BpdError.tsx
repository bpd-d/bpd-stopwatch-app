import * as React from 'react'

export interface BpdErrorProps {
    message: string;
    modifiers?: string;
}
export function BpdError(props: BpdErrorProps) {
    let cls = "cui-flex-center";
    if (props.modifiers) {
        cls += " " + props.modifiers;
    }
    return (<div className={cls}><span className="cui-text-error">{props.message}</span></div>);
}

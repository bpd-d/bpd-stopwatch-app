import * as React from 'react'

export interface LoadingProps {
    text?: string;
    modifiers?: string;
}

export function Loading(props: LoadingProps) {
    let classes = "cui-container cui-flex-center";
    const text = "Loading..."
    if (props.modifiers) {
        classes += " " + props.modifiers;
    }
    return (<div className={classes}>
        <span>{props.text ?? text}</span>
    </div>);
}

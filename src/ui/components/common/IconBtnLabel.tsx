import * as React from 'react'
export interface IconBtnLabelProps {
    label: string;
    modifiers?: string;
}

export function IconBtnLabel(props: IconBtnLabelProps) {
    let classes = "cui-margin-small-left"
    if (props.modifiers) {
        classes += " " + props.modifiers
    }
    return (<span className={classes}>{props.label}</span>);
}

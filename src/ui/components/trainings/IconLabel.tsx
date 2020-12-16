import * as React from 'react'
export interface IconLabelProps {
    label: string;
}
export function IconLabel(props: IconLabelProps) {
    return (<span className="cui-margin-small-left cui-unhidden--m">{props.label}</span>);
}

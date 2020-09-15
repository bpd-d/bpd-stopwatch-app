import * as React from 'react'

export interface BpdActionIconProps {
    type: string;
}

export function BpdActionIcon(props: BpdActionIconProps) {
    return (
        <span className="cui-icon cui-tooltip" data-tooltip={props.type} cui-icon={`stopwatch_${props.type}`}></span>
    );
}

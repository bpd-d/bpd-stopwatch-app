import * as React from 'react'

export interface BpdActionIconProps {
    type: string;
    className?: string;
}

export function BpdActionIcon(props: BpdActionIconProps) {
    return (
        <span className={"cui-icon " + (props.className ?? "")} cui-icon={`stopwatch_${props.type}`}></span>
    );
}

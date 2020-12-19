import * as React from 'react'
import { StopwatchAction } from 'src/core/models';
import { BpdActionIcon } from './BpdActionIcon';

export interface BpdActionLabelProps {
    action: StopwatchAction;
}
export function BpdActionLabel(props: BpdActionLabelProps) {
    return (
        <div className="cui-flex cui-middle">
            <div className="cui-flex-center cui-margin-right">
                <BpdActionIcon type={props.action.type} />
            </div>
            <div className="cui-flex-grow">
                <div className="">{props.action.name}</div>
                <div className="cui-text-muted">Lasts {props.action.duration} seconds</div>
            </div>
        </div>
    );
}

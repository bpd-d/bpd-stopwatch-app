import * as React from 'react';
import { calculateDuration } from '../../../core/helpers';
import { Round } from "../../../core/models";

interface RoundListItemProps {
    round: Round;
    index: number;
    onEdit: (round: Round, index: number) => void;
    onDelete: (round: Round, index: number) => void;
}

export function EditRoundListItem(props: RoundListItemProps) {

    return (
        <div className="cui-flex cui-middle">
            <div className="cui-flex-grow">
                <div><span className="cui-text-bold">Round {props.index}</span></div>
                <div className="cui-text-muted"><span >{props.round.actions.length} actions, {calculateDuration(props.round.actions)} seconds of total length</span></div>

            </div>

            <ul className="cui-icon-nav cui-flex-shrink">
                <li><a className="cui-icon" cui-icon="edit" onClick={() => { props.onEdit(props.round, props.index) }}></a></li>
                <li><a className="cui-icon" cui-icon="trash" onClick={() => { props.onDelete(props.round, props.index) }}></a></li>
            </ul>
        </div>
    );
}
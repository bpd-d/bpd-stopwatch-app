import * as React from 'react';
import { calculateDuration } from '../../../core/helpers';
import { Round } from "../../../core/models";
import { getDefaultRoundName } from '../../../core/statics';

interface RoundListItemProps {
    round: Round;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    onEdit: (round: Round, index: number) => void;
    onDelete: (round: Round, index: number) => void;
    onMoveDown: (round: Round, index: number) => void;
    onMoveUp: (round: Round, index: number) => void;
    onClone: (round: Round, index: number) => void;
}

export function EditRoundListItem(props: RoundListItemProps) {

    return (
        <div className="cui-flex cui-middle cui-nowrap">
            <div className="cui-flex-grow">
                <div><span className="cui-text-bold">{props.round.name}</span></div>
                <div className="cui-text-muted cui-text-small cui-text-no-wrap"><span >{props.round.actions.length} actions, {calculateDuration(props.round.actions)} seconds</span></div>

            </div>

            <ul className="cui-icon-nav cui-flex-shrink">
                {!props.isFirst && <li><a className="cui-icon" cui-icon="chevron_up" onClick={() => { props.onMoveUp(props.round, props.index) }} cui-tooltip="Move up"></a></li>}
                {!props.isLast && <li><a className="cui-icon" cui-icon="chevron_down" onClick={() => { props.onMoveDown(props.round, props.index) }} cui-tooltip="Move down"></a></li>}
                <li><a className="cui-icon" cui-icon="copy" onClick={() => { props.onClone(props.round, props.index) }} cui-tooltip="Clone"></a></li>
                <li><a className="cui-icon" cui-icon="edit" onClick={() => { props.onEdit(props.round, props.index) }} cui-tooltip="Edit"></a></li>
                <li><a className="cui-icon" cui-icon="trash" onClick={() => { props.onDelete(props.round, props.index) }} cui-tooltip="Delete"></a></li>
            </ul>
        </div>
    );
}
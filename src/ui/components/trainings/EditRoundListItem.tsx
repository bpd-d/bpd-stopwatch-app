import * as React from 'react';
import { calculateDuration, getUserDisplayNotation } from '../../../core/helpers';
import { Round } from "../../../core/models";
import { getDefaultRoundName } from '../../../core/statics';
import { BpdConfirmDrop } from '../common/BpdConfirmDrop';

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
                <div className="cui-text-muted cui-text-small cui-text-no-wrap"><span >{props.round.actions.length} actions, {getUserDisplayNotation(calculateDuration(props.round.actions))}</span></div>

            </div>

            <ul className="cui-icon-nav cui-flex-shrink">
                {!props.isFirst && <li><a className="cui-icon" cui-icon="chevron_up" onClick={() => { props.onMoveUp(props.round, props.index) }} cui-tooltip="Move up"></a></li>}
                {!props.isLast && <li><a className="cui-icon" cui-icon="chevron_down" onClick={() => { props.onMoveDown(props.round, props.index) }} cui-tooltip="Move down"></a></li>}
                <li><a className="cui-icon" cui-icon="copy" onClick={() => { props.onClone(props.round, props.index) }} cui-tooltip="Clone"></a></li>
                <li><a className="cui-icon" cui-icon="edit" onClick={() => { props.onEdit(props.round, props.index) }} cui-tooltip="Edit"></a></li>
                <li><div className="cui-drop-trigger">
                    <a className="cui-icon" cui-icon="trash"></a>
                    <BpdConfirmDrop id="delete-confirm-drop" message="Do you really want to delete this round?" cancelLabel="No" confirmLabel="Yes" onConfirm={() => {
                        props.onDelete(props.round, props.index);
                    }} />
                </div></li>
            </ul>
        </div>
    );
}
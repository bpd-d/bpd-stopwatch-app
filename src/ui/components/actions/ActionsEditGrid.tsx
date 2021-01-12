import * as React from 'react'
import { StopwatchAction } from '../../../core/models';
import { is } from 'bpd-toolkit/dist/esm/index';
import { getBgClassByType } from '../../../core/helpers';
import { BpdActionIcon } from '../common/BpdActionIcon';
import { IconLabel } from '../trainings/IconLabel';
import { BpdConfirmDrop } from '../common/BpdConfirmDrop';

export interface ActionsEditGridProps {
    actions: StopwatchAction[];
    filter: string;
    onEdit: (action: StopwatchAction) => void;
    onDelete: (action: StopwatchAction) => void;
}

export function ActionsEditGrid(props: ActionsEditGridProps) {
    function matchesName(name: string): boolean {
        if (!is(props.filter)) {
            return true;
        }
        let match = name.toLowerCase().match(props.filter.toLowerCase());
        return is(match);
    }

    function onOption(option: string, action: StopwatchAction) {
        switch (option) {
            case 'edit':
                props.onEdit(action)
                break;
            case "delete":
                props.onDelete(action)
                break;
        }
    }

    return (<div className="cui-container cui-flex-grid cui-flex-grid-match cui-child-width-1-1 cui-child-width-1-3--m cui-animatio-fade-in">
        {is(props.actions) && props.actions.map((action: StopwatchAction, index: number) => {
            return (matchesName(action.name) &&
                <div key={index}>

                    <div className={"cui-card cui-default " + getBgClassByType(action.type)}>
                        <div className="cui-card-header cui-flex cui-between cui-nowrap cui-middle">
                            <span className="cui-card-title cui-text-truncate cui-overflow-hidden">{action.name}</span>
                            <BpdActionIcon className="cui-padding-small" type={action.type} />
                        </div>
                        <div className="cui-card-body cui-flex cui-middle cui-nowrap action-card-height">
                            <div className="cui-flex-grow cui-overflow-hidden">
                                <div className="cui-text-truncate"><span>{action.duration} seconds</span></div>
                            </div>

                            <div className="cui-flex-shrink">
                                <ul className="cui-icon-nav">
                                    {action.editable && <li><a className="cui-icon" cui-icon="edit" onClick={() => { onOption('edit', action) }} ><IconLabel label="Edit" /></a></li>}
                                    {action.removable && <li> <div className="cui-drop-trigger">
                                        <a className="cui-icon" cui-icon="trash"><IconLabel label="Delete" /></a>
                                        <BpdConfirmDrop message="Do you really want to delete this action?" cancelLabel="No" confirmLabel="Yes" id="action-delete-drop" onConfirm={() => { props.onDelete(action) }} />
                                    </div></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>)
        })}
    </div>);
}

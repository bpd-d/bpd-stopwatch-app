import * as React from 'react'
import { StopwatchAction } from '../../../core/models';

export interface EditActionListProps {
    actions: StopwatchAction[];
    onDelete: (index: number) => void;
}

export function EditActionList(props: EditActionListProps) {
    //onDeleteClick 
    return (
        <ul className='cui-list'>

        </ul>
    );
}

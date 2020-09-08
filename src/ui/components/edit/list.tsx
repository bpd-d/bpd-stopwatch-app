import * as React from 'react'
import { Round } from '../../../core/models';

export interface RoundsListProps {
    rounds: Round[];
}

export interface RoundListItemProp {
    round: Round;
}

export function RoundsList(props: RoundsListProps) {
    return <ul className="cui-list">
        {props.rounds && props.rounds.map((item: Round, index: number) => {
            return <li key={index}><RoundListItem round={item} /></li>
        })}
    </ul>;
}

export function RoundListItem(props: RoundListItemProp) {
    return (<div className="cui-flex">
        <div className="cui-flex-grow">
            <span>{props.round.actions.length}</span>
        </div>
        <div className="cui-flex-shrink cui-flex-center">
            <ul className="cui-icon-nav">
                <li><a className="cui-icon" href="#" cui-icon="edit"></a></li>
                <li><a className="cui-icon" href="#" cui-icon="trash"></a></li>
            </ul>
        </div>
    </div>);
}


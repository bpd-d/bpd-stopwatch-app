import * as React from "react";
import { Training } from "../../../core/models";
import { Link } from "react-router-dom";

export interface TrainingListProps {
    list: Training[];
    onDelete: (id: number) => void;
}

export interface TrainingListItemProps {
    data: Training;
    onDelete: (id: number) => void;
}

export function TrainingList(props: TrainingListProps) {
    return <ul className="cui-list">
        {props.list && props.list.map(item => {
            return <li key={item.id} className="stopwatch-content-width"><TrainingListItem data={item} onDelete={props.onDelete} /></li>
        })}
    </ul>
}

export function TrainingListItem(props: TrainingListItemProps) {
    const deleteTrainingAction = "DELETE_TRAINING"
    function onDelete() {
        if (props.onDelete) {
            props.onDelete(props.data.id)
        }
    }

    React.useEffect(() => {
        const deleteSubscription = window.$flow.subscribe(deleteTrainingAction).finish((result) => {
            window.$flow.perform("GET_TRAININGS")
        });

        return () => {
            window.$flow.unsubscribe(deleteTrainingAction, deleteSubscription.id)
        }
    })

    return <div className="cui-flex cui-animation-fade-in cui-padding-bottom cui-padding-top">
        <div className="cui-flex-grow">
            <div className="cui-flex cui-middle">
                <div className="training-list-item-icon">
                    <span className="cui-text-bold">{props.data.name[0].toUpperCase()}</span>
                </div>
                <div className="cui-flex-grow cui-margin-left">
                    <span className=" cui-text-large">{props.data.name}</span>
                    <div className="cui-text-muted">
                        <span>Rounds: {props.data.rounds.length}</span>
                    </div></div>
            </div>
        </div>
        <div className="cui-flex-shrink cui-flex-center">
            <ul className="cui-icon-nav">
                <li><Link to={`/trainings/perform/${props.data.id}`} className="cui-icon cui-accent" cui-icon="media_play"></Link></li>
                <li><Link to={`/trainings/edit/${props.data.id}`} className="cui-icon" cui-icon="edit"></Link></li>
                <li><a onClick={onDelete} className="cui-icon" cui-icon="trash"></a></li>
            </ul>
        </div>
    </div>
}

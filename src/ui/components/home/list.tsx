import * as React from "react";
import { Training } from "../../../core/models";
import { Link } from "react-router-dom";

export interface TrainingListProps {
    list: Training[];
}

export interface TrainingListItemProps {
    data: Training;
}

export function TrainingList(props: TrainingListProps) {
    return <ul className="cui-list">
        {props.list && props.list.map(item => {
            return <li key={item.id}><TrainingListItem data={item} /></li>
        })}
    </ul>
}

export function TrainingListItem(props: TrainingListItemProps) {
    const deleteTrainingAction = "DELETE_TRAINING"
    function onDelete() {
        window.$cui.alert("delete-training-dialog", "YesNoCancel", {
            title: "Delete training",
            message: "Do you really want to delete training: " + props.data.name + "?",
            onYes: () => {
                window.$flow.perform(deleteTrainingAction, props.data.id)
            }
        })

    }

    React.useEffect(() => {
        const deleteSubscription = window.$flow.subscribe(deleteTrainingAction).finish((result) => {
            window.$flow.perform("GET_TRAININGS")
        });

        return () => {
            window.$flow.unsubscribe(deleteTrainingAction, deleteSubscription.id)
        }
    })

    return <div className="cui-flex">
        <div className="cui-flex-grow">
            <h3 className="cui-h3">{props.data.name}</h3>
            <div className="">
                <span>Rounds: {props.data.rounds.length}</span>
            </div>
        </div>
        <div className="cui-flex-shrink cui-flex-center">
            <ul className="cui-icon-nav">
                <li><Link to={`/trainings/perform/${props.data.id}`} className="cui-icon cui-accent cui-tooltip" cui-icon="media_play" data-tooltip="Start training"></Link></li>
                <li><Link to={`/trainings/edit/${props.data.id}`} className="cui-icon" cui-icon="edit"></Link></li>
                <li><a onClick={onDelete} className="cui-icon" cui-icon="trash"></a></li>
            </ul>
        </div>
    </div>
}

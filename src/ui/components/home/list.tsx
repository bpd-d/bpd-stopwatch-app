import * as React from "react";
import { Round, Training } from "../../../core/models";
import { Link, useHistory } from "react-router-dom";
import { calculateDuration } from "../../../core/helpers";
import { MAPPIGNS } from "../../routes";

export interface TrainingListProps {
    list: Training[];
    onDelete: (id: number) => void;
}

export interface TrainingListItemProps {
    data: Training;
    onDelete: (id: number) => void;
}

export function TrainingList(props: TrainingListProps) {
    return <ul className="cui-list cui-hover">
        {props.list && props.list.map(item => {
            return <li key={item.id} className="stopwatch-content-width cui-corner-round"><TrainingListItem data={item} onDelete={props.onDelete} /></li>
        })}
    </ul>
}

export function TrainingListItem(props: TrainingListItemProps) {
    const deleteTrainingAction = "DELETE_TRAINING";
    let history = useHistory();

    function getActionsDuration(training: Training) {
        return training.rounds.reduce<[number, number]>((result: [number, number], current: Round) => {
            return [result[0] + current.actions.length, result[1] + calculateDuration(current.actions)];
        }, [0, 0]);
    }

    function getDetails(training: Training) {
        const [actions, duration] = getActionsDuration(training);
        return `${duration} seconds`;
    }

    function onItemClick() {
        history.push(MAPPIGNS.renderUrl("perform", { id: props.data.id }))
    }

    React.useEffect(() => {
        const deleteSubscription = window.$flow.subscribe(deleteTrainingAction).finish((result) => {
            window.$flow.perform("GET_TRAININGS")
        });

        return () => {
            window.$flow.unsubscribe(deleteTrainingAction, deleteSubscription.id)
        }
    })

    return <div className="cui-flex cui-middle cui-animation-fade-in cui-padding-bottom cui-padding-top">
        <div className="cui-flex-grow" onClick={onItemClick}>
            <div className="cui-flex cui-middle cui-nowrap">
                <div className="training-list-item-icon">
                    <span className="cui-text-bold">{props.data.name[0].toUpperCase()}</span>
                </div>
                <div className="cui-flex-grow cui-margin-left">
                    <span >{props.data.name}</span>
                    <div className="cui-text-muted cui-text-truncate cui-overflow-hidden">
                        <span>{getDetails(props.data)}</span>
                    </div></div>
            </div>
        </div>
        <div className="cui-flex-shrink">
            <div>
                <Link to={MAPPIGNS.renderUrl("editTraining", { "id": props.data.id })} className="cui-icon-button" cui-icon="edit"></Link>
            </div>
        </div>
    </div>
}

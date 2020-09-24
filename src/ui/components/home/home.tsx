import * as React from "react";
import { Link } from "react-router-dom";
import { TrainingList } from "./list";
import { Training, WarmUp, CoolDown, Exercise } from "../../../core/models";
import { FlowTask } from "../../../../node_modules/bpd-flow/dist/index";
import { showMessage } from "../../../core/helpers";

export interface HomeProps {
    site?: string;
}

export interface HomeState {
    list: Training[];
}

export class Home extends React.Component<any, HomeState> {
    list: Training[];
    subscription: FlowTask<Training[]>
    onDeleteSubscription: FlowTask<boolean>;
    state: HomeState;
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            list: []
        }

        this.updateList = this.updateList.bind(this);
        this.onDeleteTrainingComplete = this.onDeleteTrainingComplete.bind(this);
        this.deleteTraining = this.deleteTraining.bind(this);

    }

    componentDidMount() {
        this.subscription = window.$flow.subscribe("GET_ALL_TRAININGS");
        this.subscription.finish(this.updateList);
        this.onDeleteSubscription = window.$flow.subscribe("DELETE_TRAINING", { finish: this.onDeleteTrainingComplete })
        window.$flow.perform("GET_ALL_TRAININGS");
    }

    componentWillUnmount() {
        window.$flow.unsubscribe("GET_ALL_TRAININGS", this.subscription.id);
        window.$flow.unsubscribe("DELETE_TRAINING", this.onDeleteSubscription.id);
    }

    deleteTraining(id: number) {
        let list = [...this.state.list];
        let elementIdx = list.findIndex(item => item.id === id);
        if (elementIdx > -1) {
            window.$cui.alert("delete-training-dialog", "YesNoCancel", {
                title: "Delete training",
                message: "Do you really want to delete training: " + list[elementIdx].name + "?",
                onYes: () => {
                    window.$flow.perform("DELETE_TRAINING", id)
                }
            })
        } else {
            showMessage("Delete training", "We cannot remove this training. Identified doesn't match.")
        }


    }

    onDeleteTrainingComplete(flag: boolean) {
        if (flag) {
            window.$flow.perform("GET_ALL_TRAININGS");
        } else {
            showMessage("Delete training", "Service could not remove training")
        }
    }

    updateList(list: Training[]) {
        this.setState({
            ...this.state,
            list: list
        });
    }



    render() {
        return <div className="stopwatch-page-layout" >
            <div className="stopwatch-page-top cui-container cui-center">
                <div>
                    <span className="cui-icon stopwatch-icon" cui-icon="stopwatch"></span>
                    <h1 className="cui-h3 cui-text-center cui-margin-small-top stopwatch-title">Stopwatch</h1>
                </div>
            </div>
            <div className="stopwatch-page-bottom">
                <div className="stopwatch-home-list cui-overflow-y-auto">
                    {this.state.list.length > 0 ? <TrainingList list={this.state.list} onDelete={this.deleteTraining} /> : <NoTrainings />}
                </div>
            </div>
            <div className="cui-position-float cui-position-bottom cui-position-right cui-margin cui-margin-large--l">
                <Link to="/trainings/edit/new" className="cui-button cui-background-default cui-box-shadow cui-rounded">
                    <span className="cui-icon" cui-icon="plus"></span>
                    <span className="cui-margin-small-left cui-text-muted cui-visible--m">Add New</span></Link>
            </div>
        </div >;
    }
}

export function NoTrainings() {
    return <div className="cui-container cui-center">
        <p className="cui-text-muted cui-text-center">There are no trainings recorded. <Link className="cui-link cui-accent" to="/trainings/edit/new">Add new</Link> training to start your execises!</p>
    </div>;
}

import * as React from "react";
import { Link } from "react-router-dom";
import { TrainingList } from "./list";
import { Training, WarmUp, CoolDown, Exercise } from "../../../core/models";
import { FlowTask } from "../../../../node_modules/bpd-flow/dist/index";

export interface HomeProps {
    site?: string;
}

export interface HomeState {
    list: Training[];
}

export class Home extends React.Component<any, HomeState> {
    list: Training[];
    subscription: FlowTask<Training[]>
    state: HomeState;
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            list: []
        }

    }

    componentDidMount() {
        this.subscription = window.$flow.subscribe("GET_ALL_TRAININGS");
        this.subscription.finish(this.updateList.bind(this));
        window.$flow.perform("GET_ALL_TRAININGS");
    }

    componentWillUnmount() {
        window.$flow.unsubscribe("GET_ALL_TRAININGS", this.subscription.id);
    }

    updateList(list: Training[]) {
        this.setState({
            ...this.state,
            list: list
        });
    }

    render() {
        return <div className="stopwatch-page-layout cui-accent" >
            <div className="stopwatch-page-top cui-container cui-center">
                <div>
                    <span className="cui-icon cui-dark" cui-icon="stopwatch"></span>
                    <h1 className="cui-h1 cui-text-center cui-text-dark">Stopwatch</h1>
                </div>
            </div>
            <div className="stopwatch-page-bottom cui-card cui-overflow-y-auto stopwatch-content-width" cui-offset="offsetY: 100; action: .cui-active">
                <div className="cui-card-header">
                    <span className="cui-card-title cui-text-muted">Your trainings</span>
                </div>
                <div className="cui-card-body" >
                    {this.state.list.length > 0 ? <TrainingList list={this.state.list} /> : <NoTrainings />}
                </div>
            </div>
            <div className="cui-position-float cui-position-bottom cui-position-right cui-margin">
                <Link to="/trainings/edit/new" className="cui-icon-button cui-default" cui-icon="plus"></Link>
            </div>
        </div>;
    }
}

export function NoTrainings() {
    function onButtonClick() {
        let training: Training = {
            name: "nasd",
            //id: 0,
            rounds: [{
                actions: [new WarmUp(5), new CoolDown(5), new Exercise(30, "Exer")]
            }]
        }
        window.$flow.perform("ADD_TRAINING", training)
    }
    return <div className="cui-container cui-center">
        <p className="cui-text-muted cui-text-center">There are no trainings recorded. <Link className="cui-link cui-accent" to="/">Add new</Link> training to start your execises!</p>
        <button onClick={onButtonClick} >Add New</button>
    </div>;
}

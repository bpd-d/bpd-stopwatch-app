import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./components/home/home";
import { ErrorRoute } from "./error";
import { Navbar } from "./components/navbar/navbar";
import { OffCanvas } from "./components/offacanvas/offcanvas";
import { Edit } from "./components/edit/edit";
import { StopwatchActionsComponent } from "./components/actions/StopwatchActionsComponent";
import EditTraining from "./components/trainings/EditTraining";
import { PerfromTraining } from "./components/perform/PerformTraining";

export interface AppProps {
}
export interface AppState {
    currentSite?: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentSite: ""
        }
    }

    componentDidUpdate() {
    }

    render() {
        return <BrowserRouter>
            <div className="stopwatch-layout-main">
                <Navbar />
                <div className="stopwatch-layout-content">
                    <Switch>
                        <Route path="/trainings/perform/:id" component={PerfromTraining}></Route>
                        <Route path="/trainings/edit/new" component={EditTraining}></Route>
                        <Route path="/trainings/edit/:id" component={EditTraining}></Route>
                        <Route path="/actions" component={StopwatchActionsComponent}></Route>
                        <Route path="/" component={Home}></Route>
                        <Route>
                            <ErrorRoute />
                        </Route>
                    </Switch>
                </div>
                <OffCanvas />
            </div></BrowserRouter>;
    }
}
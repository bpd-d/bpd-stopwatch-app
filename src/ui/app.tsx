import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./components/home/home";
import { ErrorRoute } from "./error";
import { Navbar } from "./components/navbar/navbar";
import { OffCanvas } from "./components/offacanvas/offcanvas";
import { StopwatchActionsComponent } from "./components/actions/StopwatchActionsComponent";
import EditTraining from "./components/trainings/EditTraining";
import { PerfromTraining } from "./components/perform/PerformTraining";
import { StopwatchSettings } from "./components/settings/StopwatchSettings";
import { FlowTask } from "../../node_modules/bpd-flow/dist/index";
import { SETTINGS_FLOW_ACTIONS } from "../app/flow/settings";
import { setDarkMode } from "../core/helpers";

export interface AppProps {
}
export interface AppState {
    currentSite?: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<AppProps, AppState> {
    darkModeSub: FlowTask<any>;
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentSite: ""
        }
        this.darkModeSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, { finish: this.onDarkMode.bind(this) });
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE);
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        if (this.darkModeSub) {
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, this.darkModeSub.id);
        }
    }

    onDarkMode(flag: boolean) {
        setDarkMode(flag);
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
                        <Route path="/settings" component={StopwatchSettings}></Route>
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
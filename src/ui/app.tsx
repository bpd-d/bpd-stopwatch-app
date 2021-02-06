import * as React from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./components/home/home";
import { ErrorRoute } from "./error";
import { Navbar } from "./components/navbar/navbar";
import { OffCanvas } from "./components/offacanvas/offcanvas";
// import { StopwatchActionsComponent } from "./components/actions/StopwatchActionsComponent";
//import EditTraining from "./components/trainings/EditTraining";
//import { PerfromTraining } from "./components/perform/PerformTraining";
// import { StopwatchSettings } from "./components/settings/StopwatchSettings";
import { SETTINGS_FLOW_ACTIONS } from "../app/flow/settings";
import { setDarkMode } from "../core/helpers";
// import { About } from "./components/about/About";
import { Footer } from "./components/footer/Footer";
import { MAPPIGNS } from "./routes";
import { ElementManager } from "cui-light-app/dist/esm/app/managers/element";
import { is } from "bpd-toolkit/dist/esm/index";
import { TutorialDialog } from "./components/tutorial/TutorialDialog";
// import { Help } from "./components/help/help";
// import { DevTools } from "./components/devtools/DevTools";
import { Loading } from "./components/common/Loading";

const PerfromTraining = React.lazy(() => import('./components/perform/PerformTraining'));
const EditTraining = React.lazy(() => import('./components/trainings/EditTraining'));
const StopwatchActionsComponent = React.lazy(() => import('./components/actions/StopwatchActionsComponent'));
const StopwatchSettings = React.lazy(() => import('./components/settings/StopwatchSettings'));
const About = React.lazy(() => import('./components/about/About'));
const DevTools = React.lazy(() => import('./components/devtools/DevTools'));
const Help = React.lazy(() => import('./components/help/help'));


export interface AppProps {
    mode: string;
}
export interface AppState {
    currentSite?: string;
}

export function AppBase(props: AppProps) {
    return (<BrowserRouter>
        <Route path="*">
            <App mode={props.mode} />
        </Route>
    </BrowserRouter>)
}

export function App(props: AppProps) {

    let welcomeDialogHandle: ElementManager;
    let location = useLocation();

    function onDarkMode(flag: boolean) {
        setDarkMode(flag);
    }

    function onWelcomeScreen(flag: boolean) {
        if (!flag) {
            setTimeout(() => {
                this.welcomeDialogHandle = window.$cui.get("#welcome-dialog");
                this.welcomeDialogCloseEventIds = this.welcomeDialogHandle.on("close", this.onWelcomeDialogClose.bind(this));
                window.$cui.get("#welcome-dialog").emit("open");
            }, 100)

        }
    }

    function onWelcomeDialogClose() {
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.SET_IS_WELCOME, true);
    }


    React.useEffect(() => {
        const darkModeSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, { finish: onDarkMode });
        const welcomeScreenGetSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME, { finish: onWelcomeScreen });
        welcomeDialogHandle = window.$cui.get("#welcome-dialog");
        const welcomeDialogCloseEventIds = welcomeDialogHandle.on("close", onWelcomeDialogClose);
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME);
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE);

        return () => {
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, darkModeSub.id);
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME, welcomeScreenGetSub.id);

            if (is(welcomeDialogCloseEventIds)) {
                welcomeDialogCloseEventIds.forEach((id: string) => {
                    welcomeDialogHandle.detach("close", id);
                })
            }
        }
    })
    return (
        <div className="stopwatch-layout-main">
            <Navbar />
            <div className="stopwatch-layout-content cui-overflow-y-auto">
                <React.Suspense fallback={<Loading modifiers="cui-height-viewport-1-1" />}>
                    <Switch location={location}>
                        <Route path={MAPPIGNS.getUrl("perform")} render={() => <PerfromTraining />}></Route>
                        <Route path={MAPPIGNS.getUrl("newTraining")} render={() => <EditTraining />}></Route>
                        <Route path={MAPPIGNS.getUrl("editTraining")} render={() => <EditTraining />}></Route>
                        <Route path={MAPPIGNS.getUrl("actions")} render={() => <StopwatchActionsComponent />}></Route>
                        <Route path={MAPPIGNS.getUrl("settings")} render={() => <StopwatchSettings />}></Route>
                        <Route path={MAPPIGNS.getUrl("about")} render={() => <About />}></Route>
                        <Route path={MAPPIGNS.getUrl("devtools")} render={() => <DevTools />}></Route>
                        <Route path={MAPPIGNS.getUrl("help")} render={() => <Help />}></Route>
                        <Route path={MAPPIGNS.getUrl("home")} component={Home}></Route>
                        <Route>
                            <ErrorRoute />
                        </Route>
                    </Switch>
                </React.Suspense>
            </div>
            <Footer mode={props.mode} />
            <OffCanvas />
            <TutorialDialog />
        </div >);
}
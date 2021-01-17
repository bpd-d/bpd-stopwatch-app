import * as React from "react";
import { Switch, Route, BrowserRouter, useLocation } from "react-router-dom";
import { Home } from "./components/home/home";
import { ErrorRoute } from "./error";
import { Navbar } from "./components/navbar/navbar";
import { OffCanvas } from "./components/offacanvas/offcanvas";
import { StopwatchActionsComponent } from "./components/actions/StopwatchActionsComponent";
import EditTraining from "./components/trainings/EditTraining";
import { PerfromTraining } from "./components/perform/PerformTraining";
import { StopwatchSettings } from "./components/settings/StopwatchSettings";
import { SETTINGS_FLOW_ACTIONS } from "../app/flow/settings";
import { setDarkMode } from "../core/helpers";
import { About } from "./components/about/About";
import { Footer } from "./components/footer/Footer";
import { MAPPIGNS } from "./routes";
import { ElementManager } from "cui-light/dist/esm/managers/element";
import { is } from "bpd-toolkit/dist/esm/index";
import { TutorialDialog } from "./components/tutorial/TutorialDialog";

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
                <Switch location={location}>
                    <Route path={MAPPIGNS.getUrl("perform")} component={PerfromTraining}></Route>
                    <Route path={MAPPIGNS.getUrl("newTraining")} component={EditTraining}></Route>
                    <Route path={MAPPIGNS.getUrl("editTraining")} component={EditTraining}></Route>
                    <Route path={MAPPIGNS.getUrl("actions")} component={StopwatchActionsComponent}></Route>
                    <Route path={MAPPIGNS.getUrl("settings")} component={StopwatchSettings}></Route>
                    <Route path={MAPPIGNS.getUrl("about")} component={About}></Route>
                    <Route path={MAPPIGNS.getUrl("home")} component={Home}></Route>
                    <Route>
                        <ErrorRoute />
                    </Route>
                </Switch>
            </div>
            <Footer mode={props.mode} />
            <OffCanvas />
            <TutorialDialog />
        </div>);
}


// export class App extends React.Component<AppProps, AppState> {
//     darkModeSub: FlowTask<any>;
//     welcomeScreenGetSub: FlowTask<any>;
//     welcomeDialogHandle: ElementManager;
//     welcomeDialogCloseEventIds: string[];
//     constructor(props: AppProps) {
//         super(props);
//        // const { router, params, location, routes } = this.props;
//         this.state = {
//             currentSite: ""
//         }
//         this.darkModeSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, { finish: this.onDarkMode.bind(this) });
//         this.welcomeScreenGetSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME, { finish: this.onWelcomeScreen.bind(this) });
//         this.welcomeDialogHandle = window.$cui.get("#welcome-dialog");
//         this.welcomeDialogCloseEventIds = this.welcomeDialogHandle.on("close", this.onWelcomeDialogClose.bind(this));
//         window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME);
//         window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE);
//     }

//     componentDidUpdate() {

//     }

//     componentWillUnmount() {
//         if (this.darkModeSub) {
//             window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_DARK_MODE, this.darkModeSub.id);
//         }
//         if (this.welcomeScreenGetSub) {
//             window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_IS_WELCOME, this.welcomeScreenGetSub.id);
//         }
//         if (is(this.welcomeDialogCloseEventIds)) {
//             this.welcomeDialogCloseEventIds.forEach(id => {
//                 this.welcomeDialogHandle.detach("close", id);
//             })
//         }
//     }

//     onDarkMode(flag: boolean) {
//         setDarkMode(flag);
//     }

//     onWelcomeScreen(flag: boolean) {
//         if (!flag) {
//             setTimeout(() => {
//                 this.welcomeDialogHandle = window.$cui.get("#welcome-dialog");
//                 this.welcomeDialogCloseEventIds = this.welcomeDialogHandle.on("close", this.onWelcomeDialogClose.bind(this));
//                 window.$cui.get("#welcome-dialog").emit("open");
//             }, 100)

//         }
//     }

//     onWelcomeDialogClose() {

//         window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.SET_IS_WELCOME, true);
//     }



//     render() {
//         return <BrowserRouter>
//             <div className="stopwatch-layout-main">
//                 <Navbar />
//                 <div className="stopwatch-layout-content cui-overflow-y-auto">
//                     <TransitionGroup>
//                         <CSSTransition
//                             key={location.key}
//                             classNames="fade"
//                             timeout={300}
//                         >
//                             <Switch>
//                                 <Route path={MAPPIGNS.getUrl("perform")} component={PerfromTraining}></Route>
//                                 <Route path={MAPPIGNS.getUrl("newTraining")} component={EditTraining}></Route>
//                                 <Route path={MAPPIGNS.getUrl("editTraining")} component={EditTraining}></Route>
//                                 <Route path={MAPPIGNS.getUrl("actions")} component={StopwatchActionsComponent}></Route>
//                                 <Route path={MAPPIGNS.getUrl("settings")} component={StopwatchSettings}></Route>
//                                 <Route path={MAPPIGNS.getUrl("about")} component={About}></Route>
//                                 <Route path={MAPPIGNS.getUrl("home")} component={Home}></Route>
//                                 <Route>
//                                     <ErrorRoute />
//                                 </Route>
//                             </Switch>
//                         </CSSTransition>
//                     </TransitionGroup>
//                 </div>
//                 <Footer />

//                 <OffCanvas />
//                 <TutorialDialog />
//             </div></BrowserRouter >;
//     }
// }
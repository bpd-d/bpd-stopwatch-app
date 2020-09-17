import * as React from "react";
import * as ReactDOM from "react-dom";
import '../styles/styles.scss';
import { App } from "./ui/app";
import { CuiInit, CuiInitData, CuiSetupInit, CuiInstance } from "../node_modules/cui-light/dist/index";
import { CuiIconsPack } from '../node_modules/bpd-cui-icons/index';
import { Flow, FlowFactory } from '../node_modules/bpd-flow/dist/index';
import { TrainingsStorageService, ActionStorageService } from './core/services/storage';
import { TrainingsFlow, TrainingsFlowInput, TrainingsFlowOutput } from "./app/flow/trainings";
import { ActionsFlowInput, ActionsFlowOutput, ActionsFlow } from "./app/flow/actions";
import { StopWatch } from "./api/stopwatch/stopwatch";
import { TestApi } from "./api/test/test";


declare global {
    interface Window {
        cuiInit: CuiInit;
        $cui: CuiInstance;
        $flow: Flow<any, any>;
        $actionsFlow: Flow<ActionsFlowInput, ActionsFlowOutput>;
    }
}

let rootElement = document.getElementById('root');
let app_icons = require("../static/icons/all.json");
let setup = new CuiSetupInit();
setup.logLevel = 'debug';
setup.root = rootElement;
let cuiSetup: CuiInitData = {
    setup: setup,
    icons: {
        ...CuiIconsPack,
        ...app_icons
    }
};

let service = new TrainingsStorageService();
let traningsFlow = new TrainingsFlow(service);
let actionsService = new ActionStorageService();
let actionsFlow = new ActionsFlow(actionsService);

window.$flow = FlowFactory.create<TrainingsFlowInput, TrainingsFlowOutput>(traningsFlow.getActions());
window.$actionsFlow = FlowFactory.create<ActionsFlowInput, ActionsFlowOutput>(actionsFlow.getActions());

window.cuiInit.init(cuiSetup).then((result) => {
    ReactDOM.render(<App />, rootElement);
});


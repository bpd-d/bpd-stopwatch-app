import * as React from "react";
import * as ReactDOM from "react-dom";
import '../styles/styles.scss';
import { App, AppBase } from "./ui/app";
import { CuiIconsPack } from 'bpd-cui-icons/index';
import { Flow, FlowFactory } from '../node_modules/bpd-flow/dist/index';
import { TrainingsStorageService, ActionStorageService, SettingsService } from './core/services/storage';
import { TrainingsFlow, TrainingsFlowInput, TrainingsFlowOutput } from "./app/flow/trainings";
import { ActionsFlowInput, ActionsFlowOutput, ActionsFlow } from "./app/flow/actions";
import { SettingsFlow, SettingsFlowInput, SettingsFlowOutput } from "./app/flow/settings";
import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { CuiInstance } from "cui-light/dist/esm/index";
import { CuiInitData } from "cui-light/dist/esm/initializer";
import { CuiInit } from "../../cui-light/dist/esm/init";


declare global {
    interface Window {
        // cuiInit: CuiInit;
        $cui: CuiInstance;
        $flow: Flow<any, any>;
        $actionsFlow: Flow<ActionsFlowInput, ActionsFlowOutput>;
        $settingsFlow: Flow<SettingsFlowInput, SettingsFlowOutput>;
    }
}

const loadingIndicator = document.getElementById("loading-indicator");
const loading = document.getElementById("loading-screen");

function setText(text: string) {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
            loadingIndicator.textContent = text;
        })
    } else {
        loadingIndicator.textContent = text;
    }
}


Promise.all([
    fetch('app_settings.json').then(response => response.json()),
    fetch('/static/icons/all.json').then(response => response.json())
]).then((result) => {
    onDataFetch(result[0], result[1])
}).catch(() => {
    setText("Application cannot be loaded!")
})

function onDataFetch(settings: any, icons: any) {
    setText("Application is initialing!")
    const rootElement = document.getElementById('root');
    const setup = new CuiSetupInit();
    setup.logLevel = settings?.mode === "production" ? 'error' : "debug";
    setup.root = rootElement;
    setup.busSetup = [
        {
            name: "MoveQueue",
            eventsDef: ["global_move"],
            handler: 'tasked',
            priority: 0
        },
        {
            name: "InteractQueue",
            eventsDef: ["open", "close", "switch"],
            handler: 'tasked',
            priority: 0
        },
        {
            name: "ResponsesQueue",
            eventsDef: ["opened", "closed", "switched", "resize", "offset"],
            handler: 'tasked',
            priority: 1
        },
        {
            name: "GlobalSimple",
            eventsDef: ["keydown", "scroll", "intersection", "windowclick"],
            handler: 'tasked',
            priority: 2
        },
    ]

    const cuiSetup: CuiInitData = {
        setup: setup,
        icons: {
            ...CuiIconsPack,
            ...icons
        }
    };

    const service = new TrainingsStorageService();
    const traningsFlow = new TrainingsFlow(service);
    const actionsService = new ActionStorageService();
    const actionsFlow = new ActionsFlow(actionsService);
    const settingsService = new SettingsService();
    const settingsFlow = new SettingsFlow(settingsService);

    window.$flow = FlowFactory.create<TrainingsFlowInput, TrainingsFlowOutput>(traningsFlow.getActions());
    window.$actionsFlow = FlowFactory.create<ActionsFlowInput, ActionsFlowOutput>(actionsFlow.getActions());
    window.$settingsFlow = FlowFactory.create<SettingsFlowInput, SettingsFlowOutput>(settingsFlow.getActions());

    setTimeout(() => {
        new CuiInit().init(cuiSetup).then((result) => {
            ReactDOM.render(<AppBase />, rootElement);
            loading.remove();
            rootElement.classList.remove("hidden");
        });
    }, 100)

}




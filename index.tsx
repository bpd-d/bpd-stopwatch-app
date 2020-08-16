import * as React from "react";
import * as ReactDOM from "react-dom";
import './styles/styles.scss';
//import { App } from "./components/app";
import { CuiInit, CuiInitData, CuiSetupInit, CuiInstance } from "./node_modules/cui-light/dist/index";

import { CuiIconsPack } from './node_modules/bpd-cui-icons/index'
declare global {
    interface Window {
        cuiInit: CuiInit;
        $cui: CuiInstance;
    }
}
let app_icons = require("../icons/dist/all.json");
let rootElement = document.getElementById('root');
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

//ReactDOM.render(<App />, rootElement);
window.cuiInit.init(cuiSetup).then((result) => {
    console.log(result)
});


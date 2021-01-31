import { ICuiComponent, ICuiPlugin } from "cui-light-app/dist/esm/core/models/interfaces";
import { CuiAccordionComponent } from "cui-light-app/dist/esm/components/accordion/accordion";
import { CuiCircleComponent } from "cui-light-app/dist/esm/components/circle/circle";
import { CuiCloseComponent } from "cui-light-app/dist/esm/components/close/close";
import { CuiDialogComponent } from "cui-light-app/dist/esm/components/dialog/dialog";
import { CuiDropComponenet } from "cui-light-app/dist/esm/components/drop/drop";
import { CuiIconComponent } from "cui-light-app/dist/esm/components/icon/icon";
import { CuiOffCanvasComponent } from "cui-light-app/dist/esm/components/offcanvas/offcanvas";
import { CuiOpenComponent } from "cui-light-app/dist/esm/components/open/open";
import { CuiSpinnerComponent } from "cui-light-app/dist/esm/components/spinner/spinner";
import { CuiSliderComponent } from "cui-light-app/dist/esm/components/switch/slider";
import { CuiSwitchComponent } from "cui-light-app/dist/esm/components/switch/switch";
import { CuiSwitcherComponent } from "cui-light-app/dist/esm/components/switch/switcher";
import { CuiTooltipComponent } from "cui-light-app/dist/esm/components/tooltip/tooltip";

import { CuiAutoLightModePlugin } from "cui-light-app/dist/esm/plugins/light/light";
import { CuiAutoPrintModePlugin } from "cui-light-app/dist/esm/plugins/print/print";
import { CuiToastPlugin } from "cui-light-app/dist/esm/plugins/toast/toast";
import { CuiAlertsPlugin } from "cui-light-app/dist/esm/plugins/alert/alert";

export function getUsedCuiComponents(): ICuiComponent[] {
    let prefix = 'cui'
    return [
        new CuiIconComponent(prefix),
        new CuiTooltipComponent(prefix),
        new CuiCircleComponent(prefix),
        new CuiSpinnerComponent(prefix),
        new CuiOpenComponent(prefix),
        new CuiCloseComponent(prefix),
        new CuiDialogComponent(prefix),
        new CuiOffCanvasComponent(prefix),
        new CuiAccordionComponent(prefix),
        new CuiDropComponenet(prefix),
        new CuiSwitchComponent(prefix),
        new CuiSwitcherComponent(prefix),
        new CuiSliderComponent(prefix),
    ]
}

export function getUsedPlugins(): ICuiPlugin[] {
    return [
        new CuiAutoLightModePlugin({ autoLight: true }),
        new CuiAutoPrintModePlugin({ autoPrint: false }),
        new CuiToastPlugin({}),
        new CuiAlertsPlugin()
    ]
}
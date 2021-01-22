import * as React from "react";
import { ElementManager } from "../../../../node_modules/cui-light/dist/index";
import { MAPPIGNS } from "../../routes";
import { NavbarLink, RouteNavbarLink } from "../common/NavbarLink";

export interface OffCanvasProps {
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class OffCanvas extends React.Component<OffCanvasProps, {}> {
    constructor(props: OffCanvasProps) {
        super(props);
    }

    render() {
        return <div className="cui-off-canvas" id="app-offcanvas" cui-off-canvas="escClose: y; outClose: y">
            <div className="cui-off-canvas-container cui-card off-canvas-layout cui-flex cui-flex-direction-column">
                <div className="cui-card-header cui-flex cui-middle cui-right cui-width-1-1">
                    <a href="#" className="cui-icon" cui-icon="close" cui-close=""></a>
                </div>
                <div className="off-canvas-content cui-card-body cui-flex-grow cui-flex cui-middle cui-width-1-1">
                    <div className="cui-width-1-1">
                        <h3 className="cui-h3 cui-text-center">Menu</h3>
                        <ul className="cui-list cui-highlight cui-accent cui-margin-top">
                            <li><RouteNavbarLink route={MAPPIGNS.getRoute("home")} shouldClose={true} isIcon={true} /></li>
                            <li><RouteNavbarLink route={MAPPIGNS.getRoute("actions")} shouldClose={true} isIcon={true} /></li>
                            <li><RouteNavbarLink route={MAPPIGNS.getRoute("settings")} shouldClose={true} isIcon={true} /></li>
                            <li><RouteNavbarLink route={MAPPIGNS.getRoute("help")} shouldClose={true} isIcon={true} /></li>
                            <li><RouteNavbarLink route={MAPPIGNS.getRoute("about")} shouldClose={true} isIcon={true} /></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    }
}
import * as React from "react";
import { ElementManager } from "../../../../node_modules/cui-light/dist/index";
import { MAPPIGNS } from "../../routes";
import { NavbarLink } from "../common/NavbarLink";

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
                            <li><NavbarLink url={MAPPIGNS.renderUrl("home")} name={MAPPIGNS.getName("home")} icon="home" shouldClose={true} isIcon={true} /></li>
                            <li><NavbarLink url={MAPPIGNS.renderUrl("actions")} name={MAPPIGNS.getName("actions")} icon="link" shouldClose={true} isIcon={true} /></li>
                            <li><NavbarLink url={MAPPIGNS.renderUrl("settings")} name={MAPPIGNS.getName("settings")} icon="setup" shouldClose={true} isIcon={true} /></li>
                            <li><NavbarLink url={MAPPIGNS.renderUrl("help")} name={MAPPIGNS.getName("help")} icon="emoji_smile" shouldClose={true} isIcon={true} /></li>
                            <li><NavbarLink url={MAPPIGNS.renderUrl("about")} name={MAPPIGNS.getName("about")} icon="info" shouldClose={true} isIcon={true} /></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    }
}
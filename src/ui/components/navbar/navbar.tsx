import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { MAPPIGNS } from "../../routes";
import { NavbarLink } from "../common/NavbarLink";

export interface NavbarState {
    currentSite: string;
    darkMode: boolean;
    soundEnabled: boolean
}

export interface NavbarProps {
    site?: string;
    location?: any;
}

export function Navbar(props: NavbarProps) {
    const currentLocation = useLocation();
    const [state, setState] = React.useState<NavbarState>({
        currentSite: "",
        darkMode: false,
        soundEnabled: false
    });

    function onGetSound(flag: boolean): void {

    }

    React.useEffect(() => {
        let split = currentLocation.pathname.split('/');
        setState({
            ...state,
            currentSite: split.length > 1 ? currentLocation.pathname.split('/')[1].toLocaleUpperCase() : ""
        })
    }, [currentLocation])
    return <nav className={"cui-navbar cui-sticky cui-box-shadow-remove stopwatch-layout-navigation"}>
        <div className="cui-navbar-left cui-width-1-1 cui-width-auto--m cui-flex cui-middle cui-between" id="navbar-left">
            <ul>
                {state.currentSite && <li><Link className="cui-icon" to={MAPPIGNS.renderUrl("home")} cui-icon="stopwatch_small"></Link></li>}
            </ul>
            <a className="cui-icon cui-padding cui-button cui-hidden--m" cui-icon="menu" cui-open="target: #app-offcanvas"></a>
        </div>

        <ul className="cui-navbar-right cui-unhidden--m">
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("home")} name={MAPPIGNS.getName("home")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("actions")} name={MAPPIGNS.getName("actions")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("settings")} name={MAPPIGNS.getName("settings")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("about")} name={MAPPIGNS.getName("about")} /></li>
        </ul>
    </nav>
}
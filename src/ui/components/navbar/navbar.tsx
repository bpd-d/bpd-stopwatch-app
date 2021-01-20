import * as React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { setNavbarTitle } from "../../../core/helpers";
import { PUSH_ACTIONS } from "../../../app/push/push";
import { MAPPIGNS } from "../../routes";
import { NavbarLink } from "../common/NavbarLink";
import { useNavbarTitle } from "../../../ui/hooks/NavbarTitle";

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
        soundEnabled: false,
    });
    const [location, setLocation] = React.useState("")
    const title = useNavbarTitle("");
    const history = useHistory();

    // function onTitleUpdate(value: string): void {
    //     setState({
    //         ...state,
    //         currentSite: value
    //     })
    // }

    React.useEffect(() => {
        let split = currentLocation.pathname.split('/');
        setLocation(split.length > 1 ? split[1].toLocaleUpperCase() : "")
        // const pushServiceTitleSub = window.$push.subscribe(PUSH_ACTIONS.SET_NAVBAR_TITLE, { finish: onTitleUpdate })

        return () => {
            //window.$push.unsubscribe(PUSH_ACTIONS.SET_NAVBAR_TITLE, pushServiceTitleSub.id);
        }
    }, [currentLocation])
    return <nav className={"cui-navbar cui-sticky cui-transparent stopwatch-layout-navigation"}>
        <div className="cui-navbar-left cui-width-1-1 cui-width-auto--m cui-flex cui-middle cui-between" id="navbar-left">
            <ul>
                {location && <><li><a cui-icon="chevron_small_left" onClick={() => { history.goBack() }} ></a></li>
                    <li><Link className="cui-icon" to={MAPPIGNS.renderUrl("home")} cui-icon="stopwatch_small"></Link></li>
                    <li><span>{title}</span></li>
                </>}
            </ul>
            <a className="cui-icon cui-padding cui-button cui-hidden--m" cui-icon="menu" cui-open="target: #app-offcanvas"></a>
        </div>

        <ul className="cui-navbar-right cui-unhidden--m">
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("home")} name={MAPPIGNS.getName("home")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("actions")} name={MAPPIGNS.getName("actions")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("settings")} name={MAPPIGNS.getName("settings")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("help")} name={MAPPIGNS.getName("help")} /></li>
            <li><NavbarLink class="cui-navbar-item" url={MAPPIGNS.renderUrl("about")} name={MAPPIGNS.getName("about")} /></li>
        </ul>
    </nav>
}
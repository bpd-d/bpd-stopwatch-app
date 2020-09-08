import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarLink } from "../common/link";

export interface NavbarState {
    currentSite: string;
}

export interface NavbarProps {
    site?: string;
    location?: any;
}

export function Navbar(props: NavbarProps) {
    const currentLocation = useLocation();
    const [state, setState] = React.useState<NavbarState>({ currentSite: "" });
    React.useEffect(() => {
        let split = currentLocation.pathname.split('/');
        setState({
            currentSite: split.length > 1 ? currentLocation.pathname.split('/')[1].toLocaleUpperCase() : ""
        })
    }, [currentLocation])
    return <nav className={"cui-navbar cui-transparent cui-sticky stopwatch-layout-navigation"}>
        <div className="cui-navbar-left cui-width-1-1 cui-width-auto--m cui-flex cui-middle cui-between" id="navbar-left">
            <ul>
                {state.currentSite && <li><Link className="" to="/">Home</Link></li>}
                <li><span>{state.currentSite}</span></li>
            </ul>
            <a className="cui-icon cui-padding cui-button cui-hidden--m" cui-icon="menu" cui-open="target: #app-offcanvas"></a>
        </div>

        <ul className="cui-navbar-right cui-visible--m">
            <li><NavbarLink class="cui-navbar-item" url="/" name="Home" /></li>
            <li><NavbarLink class="cui-navbar-item" url="/actions" name="Actions" /></li>
        </ul>
    </nav>
}
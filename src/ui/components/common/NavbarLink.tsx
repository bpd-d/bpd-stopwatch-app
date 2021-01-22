import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteDetails } from "src/api/routes/routes";

export interface NavbarLinkProps {
    url: string;
    name: string;
    icon?: string;
}

export interface NavbarLinkBase {
    isIcon?: boolean;
    shouldClose?: boolean;
    class?: string;
}

export class NavbarLink extends React.Component<NavbarLinkProps & NavbarLinkBase, {}> {
    constructor(props: NavbarLinkProps & NavbarLinkBase) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.shouldClose) {
            let offcanvas = window.$cui.get("#app-offcanvas");
            offcanvas.emit('close');
        }
    }

    render() {
        return <NavLink exact activeClassName="cui-active" className={this.props.class} to={this.props.url} onClick={this.onClick}>{this.props.isIcon ? <IconNavLabel name={this.props.name} icon={this.props.icon} /> : this.props.name}</NavLink>;
    }
}

export interface RouteNavbarLinkProps {
    route?: RouteDetails;
    url?: string;
}

export function RouteNavbarLink(props: RouteNavbarLinkProps & NavbarLinkBase) {
    if (!props.route) {
        return (<span className="cui-text-error">Unknown</span>)
    }
    return (<NavbarLink class={props.class} isIcon={props.isIcon} shouldClose={props.shouldClose} icon={props.route.icon} name={props.route.name} url={props.url ?? props.route.url} />);
}


export interface LinkLabelProps {
    name: string;
    icon: string;
}

export function IconNavLabel(props: LinkLabelProps) {
    return (<span className="cui-flex cui-middle"><span cui-icon={props.icon}></span><span className="cui-margin-small-left">{props.name}</span></span>)
}

export function SimpleNavLabel(props: LinkLabelProps) {
    return (<span>{props.name}</span>)
}
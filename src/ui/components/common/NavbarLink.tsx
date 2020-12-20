import * as React from "react";
import { NavLink } from "react-router-dom";

export interface NavbarLinkProps {
    url: string;
    name: string;
    icon: string;
    isIcon?: boolean;
    shouldClose?: boolean;
    class?: string;
}

export class NavbarLink extends React.Component<NavbarLinkProps, {}> {
    constructor(props: NavbarLinkProps) {
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
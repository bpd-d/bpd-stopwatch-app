import * as React from "react";
import { NavLink } from "react-router-dom";

export interface NavbarLinkProps {
    url: string;
    name: string;
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
        return <NavLink exact activeClassName="cui-active" className={this.props.class} to={this.props.url} onClick={this.onClick}>{this.props.name}</NavLink>;
    }
}
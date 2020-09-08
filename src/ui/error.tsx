import * as React from "react";
import { Link } from "react-router-dom";

export interface ErrorProps {
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ErrorRoute extends React.Component<ErrorProps, {}> {
    constructor(props: ErrorProps) {
        super(props);
    }
    render() {
        return <div className="cui-section cui-flex-center cui-height-viewport-1-2">
            <div className="cui-card cui-large">
                <div className="cui-card-header cui-text-error">
                    <span className="cui-card-title">Error</span>
                </div>
                <div className="cui-card-body">
                    It appears that page you looking for does not exist.
                    Try to look for it again or go back to our Home page
                </div>
                <div className="cui-card-footer cui-flex cui-right">
                    <Link to="/" className="cui-link">Go Home</Link>
                </div>
            </div>
        </div >
    }
}
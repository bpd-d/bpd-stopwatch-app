import * as React from "react";
import { Link } from "react-router-dom";
import GoBack from "./GoBack";

export interface NotFoundProps {
    message: string;
    classes?: string;
    goBack?: boolean;
}

export function NotFound(props: NotFoundProps) {
    return (<div className={props.classes}>
        <div>
            <h2 className="cui-h2 cui-text-center cui-text-error">{props.message}</h2>
            <div className="">
                <div className="cui-flex cui-center">
                    <Link to="/" className="cui-button cui-margin-small-right">Go Home</Link>
                    {props.goBack ?? <GoBack />}
                </div>
            </div>
        </div>
    </div>);
}
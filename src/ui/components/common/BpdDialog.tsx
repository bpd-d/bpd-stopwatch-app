import * as React from 'react'

export interface BpdDialogProps {
    title: string;
    id: string;
    body?: JSX.Element;
    footer?: JSX.Element;
    className?: string;
}

export function BpdDialog(props: BpdDialogProps) {
    React.useEffect(() => {
    }, [props])
    return (<div className={`cui-dialog ${props.className ?? ""}`} cui-dialog="escClose: Y" id={props.id}>
        <div className="cui-dialog-container">
            <div className="cui-dialog-header">
                <span className="cui-dialog-title">{props.title}</span>
                <a className="cui-icon" cui-icon="close" cui-close=""></a>
            </div>
            <div className="cui-dialog-body">
                {props.body}
            </div>

            {props.footer && (<div className="cui-dialog-footer">
                {props.footer}
            </div>)}

        </div>
    </div>)
}

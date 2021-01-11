import * as React from 'react'

export interface BpdDialogFooterProps {
    confirmLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function BpdDialogFooter(props: BpdDialogFooterProps) {
    return (<div className="cui-flex cui-right cui-middle">
        <button className="cui-button" onClick={props.onCancel}>Cancel</button>
        <button className="cui-button cui-accent cui-margin-small-left" onClick={props.onConfirm}>{props.confirmLabel}</button>
    </div>);
}

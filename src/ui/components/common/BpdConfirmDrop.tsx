import * as React from 'react'

export interface BpdConfirmDropProp {
    message: string;
    id: string;
    cancelLabel?: string;
    confirmLabel?: string;
    onCancel?: () => void;
    onConfirm: () => void;
}

export function BpdConfirmDrop(props: BpdConfirmDropProp) {
    const cancelLabel: string = props.cancelLabel ?? "Cancel";
    const confirmLabel: string = props.confirmLabel ?? "OK";
    function onCancel() {
        window.$cui.get("#" + props.id).emit("close");
        if (props.onCancel)
            props.onCancel()
    }

    function onConfirm() {
        window.$cui.get("#" + props.id).emit("close");
        props.onConfirm()
    }

    return (<div className="cui-dropdown cui-section drop-max-width" cui-drop="outClose: Y; autoClose: Y" id={props.id}>
        <p>{props.message}</p>
        <div className="cui-flex cui-right cui-margin-top">
            <button className="cui-button cui-small" onClick={() => { onCancel() }}>{cancelLabel}</button>
            <button className="cui-button cui-accent cui-small cui-margin-small-left" onClick={() => { onConfirm() }}>{confirmLabel}</button>
        </div>
    </div>);
}

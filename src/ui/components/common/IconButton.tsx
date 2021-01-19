import * as React from 'react'
import { IconBtnLabel } from './IconBtnLabel'
export interface IconButtonProps {
    label: string;
    icon: string;
    onClick?: () => void;
    modifiers?: string;
    labelModifier?: string;
}
export function IconButton(props: IconButtonProps) {
    let classes = "cui-button cui-icon";
    if (props.modifiers) {
        classes += " " + props.modifiers;
    }
    return (<button className={classes} onClick={props.onClick} cui-icon={props.icon}><IconBtnLabel label={props.label} modifiers={props.labelModifier} /></button>);
}

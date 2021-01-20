import * as React from 'react'
import { IconBtnLabel } from './IconBtnLabel'
export interface IconButtonWithLabel {
    label: string;
    icon: string;
    onClick?: () => void;
    modifiers?: string;
    labelModifier?: string;
}

export function IconButtonWithLabel(props: IconButtonWithLabel) {
    let classes = "cui-button cui-icon";
    if (props.modifiers) {
        classes += " " + props.modifiers;
    }
    return (<button className={classes} onClick={props.onClick} cui-icon={props.icon}><IconBtnLabel label={props.label} modifiers={props.labelModifier} /></button>);
}

export interface IconBtnProps {
    icon: string;
    onClick?: () => void;
    modifiers?: string;
}

export function IconButton(props: IconBtnProps) {
    let classes = "cui-icon-button cui-icon";
    if (props.modifiers) {
        classes += " " + props.modifiers;
    }
    return (<button className={classes} onClick={props.onClick} cui-icon={props.icon}></button>);
}

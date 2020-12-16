import * as React from 'react'
import { ProgressPlugin } from 'webpack';
import { IconLabel } from './IconLabel';

export interface ButtonBarProps {
    items: ButtonBarItemProps[];
}

export function ButtonBar(props: ButtonBarProps) {
    React.useEffect(() => {

    }, [props.items])
    return (<ul className="cui-list cui-inline">
        {props.items && props.items.length > 0 && props.items.map((item: ButtonBarItemProps, index: number) => {
            return <ButtonBarItem key={item.icon} icon={item.icon} label={item.label} onClick={item.onClick} modifiers={item.modifiers} />
        })}
    </ul>);
}


export interface ButtonBarItemProps {
    icon: string;
    label: string;
    modifiers?: string;
    onClick: (ev: any) => void;
}

export function ButtonBarItem(props: ButtonBarItemProps) {
    let classes = "cui-icon cui-button " + (props.modifiers ?? "");
    return (<li className="cui-padding-small-horizontal">
        <a className={classes} cui-icon={props.icon} onClick={props.onClick}><IconLabel label={props.label} /></a>
    </li>);
}
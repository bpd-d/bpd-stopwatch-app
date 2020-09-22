import * as React from 'react'
export interface OnSwitchValueUpdate {
    (name: string, value: boolean): void;
}


export interface SettingsSwitchListItemProps {
    label: string,
    value: boolean,
    name: string,
    onUpdate: OnSwitchValueUpdate;
}

export function SettingsSwitchListItem(props: SettingsSwitchListItemProps) {
    function onChange(ev: any) {
        let target = ev.target
        if (props.onUpdate) {
            props.onUpdate(target.name, target.checked);
        }
    }

    React.useEffect(() => {

    }, [props.value, props.name])
    return (
        <div className="cui-flex cui-middle cui-padding-small">
            <div className="cui-flex-grow">{props.label}</div>
            <div className="cui-input-switch">
                <input type="checkbox" id={props.name} name={props.name} checked={props.value} onChange={onChange} />
                <label htmlFor={props.name} className="cui-content"></label>
            </div>
        </div>
    );
}


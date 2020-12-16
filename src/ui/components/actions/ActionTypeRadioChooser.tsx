import { is } from 'bpd-toolkit/dist/esm/index';
import * as React from 'react'
import { StopwatchActionType } from '../../../core/models';
import { BpdActionIcon } from '../common/BpdActionIcon';

export interface ActionTypeRadioChooserProps {
    value: string;
    onChange: (action: string) => void;
    id: string;
}


interface RadioChooserItem {
    name: string;
    checked: boolean;
    id: string;
}

export function ActionTypeRadioChooser(props: ActionTypeRadioChooserProps) {
    const groupId = "radio-group" + props.id;
    const radioId = "radio-" + props.id;
    const [actions, setActions] = React.useState<RadioChooserItem[]>([])

    function onChange(ev: any) {
        if (props.onChange && ev.target.checked) {
            let found = actions.find(act => act.id === ev.target.id);
            if (is(found) && found.name !== props.value) {
                props.onChange(found.name);
            }
        }
    }

    function matches(type: string) {
        return props.value === type;
    }

    function buildItem(type: string, index: number): RadioChooserItem {
        return {
            name: type,
            checked: matches(type),
            id: radioId + index,
        }
    }

    React.useEffect(() => {
        setActions([
            buildItem(StopwatchActionType.WARMUP, 0),
            buildItem(StopwatchActionType.EXERCISE, 1),
            buildItem(StopwatchActionType.BREAK, 2),
            buildItem(StopwatchActionType.COOLDOWN, 3)
        ])

        return () => {
        }
    }, [props.value]);
    return (<div id={props.id} className="cui-flex-grid cui-child-width-1-4">
        {actions.map(action => {
            return <div key={action.id}><div className="cui-radio-custom cui-width-1-1">
                <input type="radio" id={action.id} name={groupId} checked={action.checked} onChange={onChange} />
                <label htmlFor={action.id} className="cui-content cui-padding-small cui-width-1-1">
                    <div className="cui-flex cui-center"><BpdActionIcon type={action.name} /></div>
                    <div className="cui-flex cui-center"><span className="cui-text-small">{action.name}</span></div>
                </label>
            </div></div>
        })}
    </div >);
}

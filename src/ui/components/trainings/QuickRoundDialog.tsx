import * as React from 'react'
import { buildQuickRoundActions, groupActionsByType } from '../../../core/helpers';
import { ActionsGroup, Round, RoundActions, StopwatchAction } from '../../../core/models';
import { ActionSelectDropdown } from '../actions/ActionSelectDropdown';
import { BpdDialog } from '../common/BpdDialog';
import { BpdDialogFooter } from '../common/BpdDialogFooter';


export interface QuickRoundDialogProps {
    actions: StopwatchAction[];
    onSave: (round: Round) => void;
    id: string;
}

export function QuickRoundDialog(props: QuickRoundDialogProps) {
    const groupedActions = React.useMemo<ActionsGroup>(() => {
        return groupActionsByType(props.actions)
    }, [props.actions])

    const [actions, setActions] = React.useState<RoundActions>({
        warmup: groupedActions['warmup'] ? groupedActions['warmup'][0] : null,
        exercise: groupedActions['exercise'] ? groupedActions['exercise'][0] : null,
        break: groupedActions['break'] ? groupedActions['break'][0] : null,
        cooldown: groupedActions['cooldown'] ? groupedActions['cooldown'][0] : null
    });

    const [exerciseCount, setExerciseCount] = React.useState(1);

    function onUpdate(data: StopwatchAction, type: string) {
        setActions({
            ...actions,
            [type]: data
        })

        // props.onUpdate(data)
    }

    function onCounterUpdate(value: number) {
        setExerciseCount(value);
    }

    function onDialogCancel() {
        window.$cui.get("#" + props.id).emit("close");
    }

    function onConfirm() {
        if (exerciseCount < 1) {
            return;
        }
        let round: Round = {
            name: "Quick",
            actions: buildQuickRoundActions(actions, exerciseCount)
        }
        props.onSave(round);
    }

    React.useEffect(() => {
        setActions({
            warmup: groupedActions['warmup'] ? groupedActions['warmup'][0] : null,
            break: groupedActions['break'] ? groupedActions['break'][0] : null,
            exercise: groupedActions['exercise'] ? groupedActions['exercise'][0] : null,
            cooldown: groupedActions['cooldown'] ? groupedActions['cooldown'][0] : null,
        })
        return () => {

        }
    }, [props.actions])
    return (<BpdDialog title="Quick Round"
        id={props.id}
        body={<QuickRoundDialogBody actions={groupedActions} onUpdate={onUpdate} data={actions} count={exerciseCount} onCounterUpdate={onCounterUpdate} />}
        footer={<BpdDialogFooter confirmLabel="Save" onCancel={onDialogCancel} onConfirm={onConfirm} />}
    />);
}


export interface QuickRoundDialogBodyProps {
    actions: ActionsGroup;
    data: RoundActions;
    count: number;
    onUpdate: (action: StopwatchAction, type: string) => void;
    onCounterUpdate: (value: number) => void;
}

export function QuickRoundDialogBody(props: QuickRoundDialogBodyProps) {
    return <>
        <div>
            <QuickRoundDialogSelect actions={props.actions['warmup']} value={props.data.warmup} onUpdate={props.onUpdate} type="warmup" id="warmup-select-drop" name="warmup-action" />
        </div>
        <div className="cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions['exercise']} value={props.data.exercise} onUpdate={props.onUpdate} type="exercise" id="exercise-select-drop" name="exercise-action" />
        </div>
        <div className="cui-form cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions['break']} value={props.data.break} onUpdate={props.onUpdate} type="break" id="break-select-drop" name="break-action" />
        </div>
        <div className="cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions['cooldown']} value={props.data.cooldown} onUpdate={props.onUpdate} type="cooldown" id="cooldown-select-drop" name="cooldown-action" />
        </div>
        <div className="cui-form cui-margin-top">
            <label className="cui-form-label">Number of exercises</label>
            <input type="number" className="cui-input" min="1" max="10" value={props.count} onChange={(ev) => {
                if (ev.target && ev.target.value) {
                    let int = parseInt(ev.target.value);
                    if (!isNaN(int))
                        props.onCounterUpdate(int)
                }
            }} />
        </div>
    </>;
}

export interface QuickRoundDialogSelectProps {
    type: string;
    actions: StopwatchAction[];
    value: StopwatchAction;
    id: string;
    name: string;
    onUpdate: (actions: StopwatchAction, type: string) => void;
}

export function QuickRoundDialogSelect(props: QuickRoundDialogSelectProps) {
    return (<>
        <span className="cui-text-capital">{props.type}</span>
        <div className="cui-flex cui-middle">
            <div className="cui-flex-grow">
                <ActionSelectDropdown value={props.value} actions={props.actions} onSelect={(value) => { props.onUpdate(value, props.type) }} name={props.name} id={props.id} />
            </div>
            <button className="cui-icon-button" cui-icon="close" onClick={() => { props.onUpdate(null, "cooldown") }}></button>
        </div>
    </>)
}
import * as React from 'react'
import { buildQuickRoundActions, groupActionsByType } from '../../../core/helpers';
import { ActionsGroup, Round, RoundActions, StopwatchAction, StopwatchActionType } from '../../../core/models';
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

    function updateCounter(count: number) {
        if (count > 0 && count < 12) {
            props.onCounterUpdate(count);
        }
    }

    return <>
        <div>
            <QuickRoundDialogSelect actions={props.actions[StopwatchActionType.WARMUP]} value={props.data.warmup} onUpdate={props.onUpdate} type={StopwatchActionType.WARMUP} id="warmup-select-drop" name="warmup-action" />
        </div>
        <div className="cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions[StopwatchActionType.EXERCISE]} value={props.data.exercise} onUpdate={props.onUpdate} type={StopwatchActionType.EXERCISE} id="exercise-select-drop" name="exercise-action" />
        </div>
        <div className="cui-form cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions[StopwatchActionType.BREAK]} value={props.data.break} onUpdate={props.onUpdate} type={StopwatchActionType.BREAK} id="break-select-drop" name="break-action" />
        </div>
        <div className="cui-margin-top">
            <QuickRoundDialogSelect actions={props.actions[StopwatchActionType.COOLDOWN]} value={props.data.cooldown} onUpdate={props.onUpdate} type={StopwatchActionType.COOLDOWN} id="cooldown-select-drop" name="cooldown-action" />
        </div>
        <div className="cui-form cui-margin-top">
            <label className="cui-form-label">Number of exercises</label>
            <div className="cui-flex cui-middle cui-margin-small-top">
                <button className="cui-icon-button" cui-icon="minus" onClick={() => updateCounter(props.count - 1)}></button>
                <span className="cui-margin-horizontal">{props.count}</span>
                <button className="cui-icon-button" cui-icon="plus" onClick={() => updateCounter(props.count + 1)}></button>
            </div>
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
        <span className="cui-text-capital cui-inline-block">{props.type}</span>
        <div className="cui-flex cui-middle cui-margin-small-top">
            <div className="cui-flex-grow">
                <ActionSelectDropdown value={props.value} actions={props.actions} onSelect={(value) => { props.onUpdate(value, props.type) }} name={props.name} id={props.id} />
            </div>
            <button className="cui-icon-button" cui-icon="close" onClick={() => { props.onUpdate(null, "cooldown") }}></button>
        </div>
    </>)
}
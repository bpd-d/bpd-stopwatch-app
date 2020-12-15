import * as React from 'react'
import { ACTIONS_FLOW_ACTIONS } from '../../../app/flow/actions';
import { SETTINGS_FLOW_ACTIONS } from '../../../app/flow/settings';
import { ACTIONS } from '../../../app/flow/trainings';

export function SettingsDevTools() {
    function onClear() {
        window.$cui.toast("Data cleared")
    }

    function onSettingsUpdate() {
        console.log("Settings cleared")
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_SETTINGS);
    }

    React.useEffect(() => {
        const settingsClearSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.CLEAR_SETTINGS, { finish: onSettingsUpdate });
        const actionsClearSub = window.$actionsFlow.subscribe(ACTIONS_FLOW_ACTIONS.CLEAR_ACTIONS, { finish: onClear });
        const trainingsClearSub = window.$flow.subscribe(ACTIONS.CLEAR_TRAININGS, { finish: onClear });


        return () => {

            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.CLEAR_SETTINGS, settingsClearSub.id);
            window.$actionsFlow.unsubscribe(ACTIONS_FLOW_ACTIONS.CLEAR_ACTIONS, actionsClearSub.id);
            window.$flow.unsubscribe(ACTIONS.CLEAR_TRAININGS, trainingsClearSub.id);
        }
    }, [])
    return (<div className="cui-section">
        <h3 className="cui-h3">Dev tools</h3>
        <div className="cui-flex">
            <button className="cui-button cui-margin-small cui-default" onClick={() => { window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.CLEAR_ACTIONS) }}>Clear actions only</button>
            <button className="cui-button cui-margin-small cui-default" onClick={() => { window.$flow.perform(ACTIONS.CLEAR_TRAININGS) }}>Clear trainings only</button>
            <button className="cui-button cui-margin-small cui-default" onClick={() => { window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.CLEAR_SETTINGS) }}>Clear settings only</button>
            <button className="cui-button cui-margin-small cui-error" onClick={() => {
                window.$actionsFlow.perform(ACTIONS_FLOW_ACTIONS.CLEAR_ACTIONS)
                window.$flow.perform(ACTIONS.CLEAR_TRAININGS)
                window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.CLEAR_SETTINGS)
            }}>Clear data</button>
        </div>
    </div>);
}

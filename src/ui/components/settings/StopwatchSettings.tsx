import * as React from 'react'
import { SETTINGS_FLOW_ACTIONS } from '../../../app/flow/settings';
import { setDarkMode } from '../../../core/helpers';
import { Settings } from '../../../core/models';
import { SettingsSwitchListItem } from './SettingsSwitchListItem'
export interface SettingsState {
    darkModeEnabled: boolean;
    soundEnabled: boolean;
}
export function StopwatchSettings() {
    const [settings, setSettings] = React.useState<Settings>({
        soundEnabled: false,
        darkMode: false
    })

    function onValueChange(name: string, value: boolean) {
        if (name !== 'soundEnabled' && name !== "darkMode") {
            return;
        }
        let newSettings = {
            ...settings,
            [name]: value
        }
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, newSettings);
        setSettings(newSettings)
    }

    function onUpdateSettings() {
        console.log("Update")
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_SETTINGS);
    }

    function onGetSettings(settings: Settings) {
        console.log("GetSetting")
        if (settings) {
            setSettings(settings);
            setDarkMode(settings.darkMode);
        }
    }

    React.useEffect(() => {
        console.log("Reload")
        const settingsSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_SETTINGS, { finish: onGetSettings })
        const settingsUpdateSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, { finish: onUpdateSettings })

        onUpdateSettings();
        return () => {
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_SETTINGS, settingsSub.id);
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, settingsUpdateSub.id);
        }
    }, [settings.darkMode, settings.soundEnabled])
    return (<><div className="cui-container stopwatch-content-width">
        <div className="stopwatch-page-header cui-container cui-center">
            <div>
                <h1 className="cui-h1 cui-text-center">Settings</h1>
                <p className="cui-text-center cui-text-muted">Change application setup</p>
            </div>
        </div>
        <div className="cui-margin-top">
            <ul className="cui-list">
                <li>
                    <SettingsSwitchListItem label="Dark mode" name="darkMode" value={settings.darkMode} onUpdate={onValueChange} />
                </li>
                <li>
                    <SettingsSwitchListItem label="Play sound" name="soundEnabled" value={settings.soundEnabled} onUpdate={onValueChange} />
                </li>
            </ul>
        </div>
    </div></>);
}



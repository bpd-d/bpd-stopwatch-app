import * as React from 'react'
import { DefaultSettings } from '../../../core/statics';
import { SETTINGS_FLOW_ACTIONS } from '../../../app/flow/settings';
import { setDarkMode } from '../../../core/helpers';
import { Settings } from '../../../core/models';
import { PageHeader } from '../common/PageHeader';
import { SettingsDevTools } from './SettingsDevTools';
import { SettingsSwitchListItem } from './SettingsSwitchListItem'
export interface SettingsState {
    darkModeEnabled: boolean;
    soundEnabled: boolean;
}
export function StopwatchSettings() {
    const [settings, setSettings] = React.useState<Settings>({
        ...DefaultSettings
    })

    function onValueChange(name: string, value: boolean) {
        if (name !== 'soundEnabled' && name !== "darkMode" && name !== "simpleView") {
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
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_SETTINGS);
    }

    function onGetSettings(settings: Settings) {
        if (settings) {
            console.log(settings)
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
    return (<><div className="stopwatch-content-width">
        <PageHeader title="Settings" description="Change application setup" />
        <div className="cui-section">
            <ul className="cui-list">
                <li>
                    <SettingsSwitchListItem label="Dark mode" name="darkMode" value={settings.darkMode} onUpdate={onValueChange} />
                </li>
                <li>
                    <SettingsSwitchListItem label="Play sound" name="soundEnabled" value={settings.soundEnabled} onUpdate={onValueChange} />
                </li>
                <li>
                    <SettingsSwitchListItem label="Simple timer view" name="simpleView" value={settings.simpleView} onUpdate={onValueChange} />
                </li>
                <li>Welcome screen status: {settings.isWelcome ? "Yes" : "No"}</li>
            </ul>
            <div className="cui-section">
                <button className="cui-button cui-default" onClick={() => {
                    window.$cui.get("#welcome-dialog").emit("open");
                }}>Show tutorial dialog</button>
            </div>
        </div>
        <SettingsDevTools />
    </div></>);
}



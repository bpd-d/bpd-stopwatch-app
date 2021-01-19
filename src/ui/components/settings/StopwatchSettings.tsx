import * as React from 'react'
import { setNavbarTitle, setPageTitle } from '../../../core/helpers';
import { PageHeader } from '../common/PageHeader';
import { SettingsDevTools } from './SettingsDevTools';
import { SettingsSwitchListItem } from './SettingsSwitchListItem'
import { useSettings } from '../../../ui/hooks/settings';

export interface SettingsState {
    darkModeEnabled: boolean;
    soundEnabled: boolean;
}

export function StopwatchSettings() {
    const [settings, setSettings] = useSettings();


    function onValueChange(name: string, value: boolean) {

        if (name !== 'soundEnabled' && name !== "darkMode" && name !== "simpleView") {
            return;
        }
        let newSettings = {
            ...settings,
            [name]: value
        }
        setSettings(newSettings)
    }


    React.useEffect(() => {
        setPageTitle("Settings");
        setNavbarTitle("Settings");

    }, [settings.darkMode, settings.soundEnabled])
    return (<><div className="stopwatch-content-width">
        <PageHeader title="Settings" description="Change application setup" icon="setup" />
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
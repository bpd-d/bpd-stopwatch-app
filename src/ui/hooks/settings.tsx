import * as React from 'react'
import { DefaultSettings } from '../../core/statics';
import { Settings } from '../../core/models';
import { SETTINGS_FLOW_ACTIONS } from '../../app/flow/settings';
import { setDarkMode } from '../../core/helpers';

export function useSettings(): [Settings, (settings: Settings) => void] {
    const [settings, setSettings] = React.useState({
        ...DefaultSettings
    })

    function onSaveSettings() {
        // Obtain settings from store
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.GET_SETTINGS);
    }

    function onGetSettings(settings: Settings) {
        setSettings(settings);
        setDarkMode(settings.darkMode);
    }

    function updateSettings(settings: Settings) {
        window.$settingsFlow.perform(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, settings);
    }

    React.useEffect(() => {
        const settingsSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.GET_SETTINGS, { finish: onGetSettings })
        const settingsUpdateSub = window.$settingsFlow.subscribe(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, { finish: onSaveSettings })
        onSaveSettings();
        return () => {
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.GET_SETTINGS, settingsSub.id);
            window.$settingsFlow.unsubscribe(SETTINGS_FLOW_ACTIONS.SET_SETTINGS, settingsUpdateSub.id);
        }
    }, [settings.darkMode, settings.soundEnabled])

    return [settings, updateSettings];
}

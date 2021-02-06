import * as React from 'react'
import { SettingsSwitchListItem } from './SettingsSwitchListItem'
import { useSettings } from '../../../ui/hooks/settings';
import { BpdDrop } from '../common/BpdDrop';
import { COUNTDOWN_TYPES } from '../perform/countdown/models';
import { MAPPIGNS } from '../../../ui/routes';
import { useAppSettings } from '../../../ui/hooks/AppSettings';
import { AppRunningModes } from '../../../core/models';
import { MainComponentBase } from '../common/MainComponentBase';
import { Link } from 'react-router-dom';

export default function StopwatchSettings() {
    const [settings, setSettings] = useSettings();
    const appSettings = useAppSettings();

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

    function onDropChange(name: string, value: string) {
        let newSettings = {
            ...settings,
            [name]: value
        }
        setSettings(newSettings)
    }
    React.useEffect(() => {

    }, [settings.darkMode, settings.soundEnabled])
    return (<>
        <MainComponentBase routeName="settings">
            <div key="settings-switches" className="cui-section stopwatch-content-width">
                <ul className="cui-list">
                    <li>
                        <SettingsSwitchListItem label="Dark mode" name="darkMode" value={settings.darkMode} onUpdate={onValueChange} />
                    </li>
                    <li>
                        <SettingsSwitchListItem label="Play sound" name="soundEnabled" value={settings.soundEnabled} onUpdate={onValueChange} />
                    </li>
                    <li>
                        <div className="cui-flex cui-middle cui-between cui-padding-small">
                            <span>Countdown timer</span>
                            <BpdDrop id="settings-drop" name="countdownView" value={settings.countdownView} items={COUNTDOWN_TYPES} onChange={onDropChange} />
                        </div>
                    </li>

                </ul>
            </div>
            <div key="settings-devtool" className="cui-flex cui-center cui-right--s">
                {appSettings.mode === AppRunningModes.DEVELOPMENT && <Link to={MAPPIGNS.getUrl('devtools')} className="cui-link" >Visit DevTools</Link>}
            </div>
        </MainComponentBase></>);
}
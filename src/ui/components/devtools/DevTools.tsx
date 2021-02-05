import * as React from 'react'
import { useSettings } from '../../../ui/hooks/settings';
import { MainComponentBase } from '../common/MainComponentBase';
import { SettingsDevTools } from '../settings/SettingsDevTools';

export default function DevTools() {
    const [settings] = useSettings();
    return (
        <MainComponentBase routeName="devtools">
            <div className="cui-section">
                <button className="cui-button cui-default" onClick={() => {
                    window.$cui.get("#welcome-dialog").emit("open");
                }}>Show tutorial dialog</button>
            </div>
            <div>
                Welcome screen status: {settings.isWelcome ? "Yes" : "No"}
            </div>
            <SettingsDevTools />
        </MainComponentBase>);
}

import * as React from 'react'
import { Link } from 'react-router-dom';
import { MAPPIGNS } from '../../../ui/routes';
import { AppRunningModes } from '../../../core/models';
import { useAppSettings } from '../../../ui/hooks/AppSettings';

export interface FooterProps {
    mode: string;
}

export function Footer(props: FooterProps) {
    const appSettings = useAppSettings();
    function currentYear(): string {
        return new Date().getFullYear() + "";
    }
    return (
        <div className="stopwatch-footer cui-flex cui-right cui-middle">
            <div className="cui-margin-horizontal">
                <span className="cui-margin-small-right">Copyrights {currentYear()}</span>
                <a href="https://github.com/bpd-d" target="_blank" className="cui-link cui-accent">BPDDev</a>
                {appSettings.mode === AppRunningModes.DEVELOPMENT && <Link to={MAPPIGNS.getUrl('devtools')} className="cui-link cui-secondary cui-margin-left cui-text-bold">Dev</Link>}
            </div>
        </div>);
}

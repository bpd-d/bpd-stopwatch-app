import * as React from 'react'

export interface FooterProps {
    mode: string;
}

export function Footer(props: FooterProps) {
    function currentYear(): string {
        return new Date().getFullYear() + "";
    }
    return (
        <div className="stopwatch-footer cui-flex cui-right cui-middle">
            <div className="cui-margin-horizontal">
                <span className="cui-margin-small-right">Copyrights {currentYear()}</span>
                <a href="https://github.com/bpd-d" target="_blank" className="cui-link cui-accent">BPDDev</a>
                {props.mode === 'development' && <span className="cui-margin-left cui-text-bold">Dev</span>}
            </div>
        </div>);
}

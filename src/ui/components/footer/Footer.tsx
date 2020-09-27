import * as React from 'react'

export function Footer() {
    function currentYear(): string {
        return new Date().getFullYear() + "";
    }
    return (
        <div className="stopwatch-footer cui-flex cui-right--l cui-middle">
            <div className="cui-margin-horizontal">
                <span className="cui-margin-small-right">Copyrights {currentYear()}</span>
                <a href="https://github.com/bpd-d" target="_blank" className="cui-link cui-accent">BPDDev</a>
            </div>
        </div>);
}

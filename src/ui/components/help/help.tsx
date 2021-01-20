import * as React from 'react'
import { setNavbarTitle, setPageTitle } from '../../../core/helpers';
import { PageHeader } from '../common/PageHeader';

export function Help() {
    setPageTitle("Help");
    setNavbarTitle("Help");
    return (<div className="stopwatch-content-width">
        <PageHeader title="Help" description="Get started with bpd Stopwatch app" icon="emoji_smile" />
        <div className="cui-container cui-flex-center">Work in progress...</div>

    </div>);
}

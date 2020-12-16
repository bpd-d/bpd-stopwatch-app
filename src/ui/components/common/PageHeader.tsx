import * as React from 'react'

export interface PageHeaderProps {
    title: string;
    description: string;
}


export function PageHeader(props: PageHeaderProps) {
    return (<div className="stopwatch-page-header cui-container cui-center">
        <div>
            <h1 className="cui-h1 cui-text-center cui-margin-remove cui-anim-fade-in">{props.title}</h1>
            <p className="cui-text-center cui-text-muted cui-scale-y-in cui-animation-delay">{props.description}</p>
        </div>
    </div>);
}

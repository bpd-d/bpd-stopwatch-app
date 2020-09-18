import * as React from 'react'

export interface ErrorsListProps {
    errors: string[];
}


export function ErrorsList(props: ErrorsListProps) {
    return (
        <>
            {props.errors &&
                props.errors.length > 0 &&
                <ul className="cui-list">
                    {
                        props.errors.map((error: string, index: number) => {
                            return <li key={index} className="cui-animation-fade-in"><span className="cui-text-error">{error}</span></li>
                        })
                    }
                </ul>}
        </>
    );
}

import * as React from 'react'
import { FetchResponse, useFetch } from '../../../ui/hooks/fetch';
import { BpdLoading } from '../common/BpdLoading';
import { BpdError } from '../common/BpdError';
import { DocComponentSection } from '../docs/components';
import { Doc } from '../docs/interfaces';
import { MainComponentBase } from '../common/MainComponentBase';


export function Help() {
    return (
        <MainComponentBase routeName="help">
            <HelpContent key="help" />
        </MainComponentBase >
    );
}

export function HelpContent() {
    const helpDocsData: FetchResponse<Doc> = useFetch<Doc>('/static/docs/help.json');

    React.useEffect(() => {
    })
    if (helpDocsData.error) {
        return (<BpdError message={helpDocsData.error.message} />)
    }
    if (helpDocsData.loading || !helpDocsData.response) {
        return (<BpdLoading />);
    }
    return (<HelpDoc doc={helpDocsData.response} />);
}


export interface HelpDocProps {
    doc: Doc;
}
export function HelpDoc(props: HelpDocProps) {

    return (<>
        <div className="cui-section">
            <h2 className="cui-h2">Contents</h2>
            <ul className="cui-list">
                {props.doc.sections.map(section => {
                    return (<li key={section.id}><a className="cui-link cui-accent" href={"#" + section.id}>{section.name}</a></li>);
                })}
            </ul>
        </div>
        {
            props.doc.sections.map(section => {
                return <DocComponentSection key={section.id} section={section} />
            })
        }
        <div className="">
            Version: {props.doc.version}
        </div>
    </>);
}



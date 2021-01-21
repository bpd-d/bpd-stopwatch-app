import * as React from 'react'
import { setNavbarTitle, setPageTitle } from '../../../core/helpers';
import { PageHeader } from '../common/PageHeader';

export function Help() {
    setPageTitle("Help");
    setNavbarTitle("Help");
    return (<div className="stopwatch-content-width">
        <PageHeader title="Help" description="Get started with bpd Stopwatch app" icon="emoji_smile" />
        <div className="cui-container cui-flex-center">Work in progress...</div>
        <TestWrapper>
            <TestWrapperChild name="Jeden" />
            <TestWrapperChild name="Dwa" />
            <TestWrapperChild name="Trzy" />
        </TestWrapper>
    </div>);
}

interface TestWrapperProps {
    children?: JSX.Element[];
}

function TestWrapper(props: TestWrapperProps) {
    return (
        <div>
            {props.children ? props.children.map((child, index) => {
                return React.cloneElement(child, { index: index, ...child.props })
            }) : <div>Nothing</div>}
        </div>
    );
}

interface TestWrapperChildProps {
    name: string;
    index?: number;
}

function TestWrapperChild(props: TestWrapperChildProps) {
    return (
        <div>
            <h2 className="cui-h2">{props.name}</h2>
            <p>Index: {props.index}</p>
        </div>
    );
}

import { is } from 'bpd-toolkit/dist/esm/index';
import * as React from 'react'
import { setPageTitle, setNavbarTitle, createArray } from '../../../core/helpers';
import { MAPPIGNS } from '../../../ui/routes';
import { PageHeader } from './PageHeader';

export interface MainComponentBaseProps {
    routeName: string;
    children: JSX.Element | JSX.Element[] | undefined;
}

export interface BaseComponentProps {
    setPageTitle: (value: string) => void;
}

export function MainComponentBase(props: MainComponentBaseProps) {
    const routeData = MAPPIGNS.getRoute(props.routeName);
    const [title, setTitle] = React.useState(routeData.name);

    function updateTitle(title: string) {
        if (!is(title)) {
            return;
        }
        setPageTitle(routeData.name);
        setNavbarTitle(routeData.name);
        setTitle(title)
    }

    React.useEffect(() => {
        setPageTitle(routeData.name);
        setNavbarTitle(routeData.name);
    }, [])
    return (
        <>
            <PageHeader title={title} icon={routeData.icon} description={routeData.description} />
            {
                createArray(props.children).map(child => {
                    return React.cloneElement(child, { setPageTitle: updateTitle, ...child.props })
                })
            }
        </>
    );
}

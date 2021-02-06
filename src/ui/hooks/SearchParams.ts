import { Location } from 'history';
import * as React from 'react';

export interface SearchParamsResult {
    searchParams: URLSearchParams,
    search: string,
}

export function useSearchParams<T>(location: Location<T>): SearchParamsResult {
    const params = new URLSearchParams(location.search);

    React.useEffect(() => {
        console.log("useSearchParams")
    }, [location.search])
    return {
        searchParams: params,
        search: location.search
    };
}
import * as React from "react";

export interface FetchResponse<T> {
    response: T;
    error: Error;
    loading: boolean;
}

export function useFetch<T>(url: string, options?: any): FetchResponse<T> {
    const [response, setResponse] = React.useState<FetchResponse<T>>({
        response: undefined,
        error: undefined,
        loading: false
    });

    function getDataAsync() {
        setResponse({
            ...response,
            loading: true
        })
        fetch(url, options).
            then(response => response.json()).
            then((jsonData) => {
                setResponse({
                    error: undefined,
                    response: jsonData,
                    loading: false
                })
            }).catch((e) => {
                setResponse({
                    error: e,
                    response: undefined,
                    loading: false
                })
            });

    }

    React.useEffect(() => {
        getDataAsync();
    }, [])

    return response;
}
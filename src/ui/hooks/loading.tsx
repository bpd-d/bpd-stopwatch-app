import * as React from 'react'

export function useIsLoading(init: boolean): [boolean, (val: boolean) => void] {
    const loading = React.useRef(init);

    function setIsLoading(flag: boolean) {
        console.log("Flag: " + flag + ", Loading: " + loading)
        if (loading.current != flag) {
            loading.current = flag;
        }
    }
    React.useEffect(() => {
        loading.current = init;
    }, [])
    return [loading.current, setIsLoading];
}

import { is } from 'bpd-toolkit/dist/esm/index'
import * as React from 'react'

export function useResize(element: Element | Window, callback: (element: Element | Window) => void) {
    function onResize() {
        if (callback && element) {
            callback(element)
        }
    }

    React.useEffect(() => {
        if (element) {
            window.addEventListener('resize', onResize)
        }

        return () => {
            if (element) {
                window.removeEventListener('resize', onResize)
            }

        }
    }, [element])
}


export function useIsFullscreen(element: Element) {
    const resizeEl = useResize(element, onResize)
    const [isFullscreen, setIsFullscreen] = React.useState(isElementFullscreen(element));

    function onResize(element: Element) {
        if (is(element))
            setIsFullscreen(isElementFullscreen(element))
    }

    function isElementFullscreen(element: Element) {
        if (!is(element)) {
            return false;
        }
        return element && element.clientHeight >= ((screen.availHeight || screen.height) - 30) && element.clientWidth >= ((screen.availWidth || screen.width) - 30)
    }

    React.useEffect(() => { }, [isFullscreen])
    return isFullscreen
}

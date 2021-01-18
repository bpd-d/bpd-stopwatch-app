import * as React from "react";
import { PUSH_ACTIONS } from "../../app/push/push";

export function useNavbarTitle(init: string): string {
    const [title, setTitle] = React.useState(init);

    function onUpdate(value: string) {
        setTitle(value);
    }
    React.useEffect(() => {
        const pushServiceTitleSub = window.$push.subscribe(PUSH_ACTIONS.SET_NAVBAR_TITLE, { finish: onUpdate })
        return () => {
            window.$push.unsubscribe(PUSH_ACTIONS.SET_NAVBAR_TITLE, pushServiceTitleSub.id);
        }
    })
    return title;
}
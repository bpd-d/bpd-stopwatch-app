import { is } from 'bpd-toolkit/dist/esm/index';
import * as React from 'react'
import { ElementManager } from 'cui-light/dist/esm/managers/element';
import { BpdDialog } from '../common/BpdDialog';

export function TutorialDialog() {
    const [isLast, setIsLast] = React.useState(false);
    const switchElement = React.useRef<ElementManager>(null);
    function onSwitched(data: any) {
        if (is(data) && is(data.index) && data.index === 2) {
            setIsLast(true)
            return
        }
        setIsLast(false)
    }

    function onNextClick() {
        if (isLast) {
            window.$cui.get("#welcome-dialog").emit("close");
            return;
        }
        switchElement.current.emit("switch", "next")

    }

    function getElement() { }

    React.useEffect(() => {
        switchElement.current = window.$cui.get("#welcome-switch");
        const ids: string[] = switchElement.current.on("switched", onSwitched);
        return () => {
            if (is(ids)) {
                ids.forEach(id => {
                    switchElement.current.detach("switched", id)
                })

            }

        }
    }, [isLast])
    return (
        <BpdDialog id="welcome-dialog" title="Welcome"
            body={
                <ul id="welcome-switch" cui-switch="links: #welcome-step-indicator > li; height: 250px">
                    <li className="cui-active"><div>Welcome to <span className="cui-text-bold cui-text-accent">Bpd Stopwatch</span> app. It is simple, offline tool which will allow you to perform highly custimzed trainings that need stopwatch.</div></li>
                    <li><div>Set up some <span className="cui-text-bold cui-text-accent">Actions</span> to build your trainings from. You can define action name, type and it's duration. Action type has it's indications in <span className="cui-text-bold">colors</span> and <span className="cui-text-bold">sounds</span> later when your training is performed, so choose type accordingly to your action type.
                    You can choose from <span className="cui-text-italic">warmup</span>, <span className="cui-text-italic">exercise</span>, <span className="cui-text-italic">break</span> and <span className="cui-text-italic">cooldown</span>. There are some actions already defined (they cannot be modified or deleted), which can help you to start with building your trainings.</div></li>
                    <li><div>Give your <span className="cui-text-bold cui-text-accent">training</span> a name and optionally  <span className="cui-text-bold cui-accent">description</span>, then setup <span className="cui-text-bold cui-accent">rounds</span>. You can define rounds from available actions.
                        Once added they can be <span className="cui-text-italic">re-positioned</span>, <span className="cui-text-italic">cloned</span> or <span className="cui-text-italic">deleted</span>.</div></li>
                </ul>
            }
            footer={
                <div className="cui-flex cui-middle">
                    <ul id="welcome-step-indicator" className="cui-switcher-indicator cui-flex-grow" cui-switcher="target: #welcome-switch">
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                    </ul>
                    <div>
                        <button className="cui-button" onClick={onNextClick}>{isLast ? "Close" : "Next"}</button>
                    </div>
                </div>
            }
        />
    );
}

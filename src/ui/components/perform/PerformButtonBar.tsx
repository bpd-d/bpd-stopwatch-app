import * as React from "react";
import { StopWatchPerformState, StopWatchStateOptions } from "../../../api/stopwatch/stopwatch";
import { IconButton } from "../common/IconButton";

interface CurrentStateControls {
    startBtnCls: string;
    startBtnText: string;
    isPauseVisible: boolean;
    pauseBtnText: string;
    startBtnIcon: string;
    pauseBtnIcon: string;
}


export interface PerformerButtonBarProps {
    onFullScreen: () => void;
    onMute: () => void;
    onPauseResume: () => void;
    onStartStop: () => void;
    playState: StopWatchPerformState;
    soundIcon: string;
    fullscreenIcon: string;
}

export function PerformerButtonBar(props: PerformerButtonBarProps) {
    const [controls, setControls] = React.useState<CurrentStateControls>({
        startBtnText: "Start",
        startBtnCls: "cui-accent",
        pauseBtnText: "Pause",
        isPauseVisible: false,
        startBtnIcon: "media_play",
        pauseBtnIcon: "media_pause"
    })


    function updatePlayStateControls(state: StopWatchPerformState) {
        switch (state) {
            case StopWatchStateOptions.RUNNING:
                setControls({
                    startBtnCls: "cui-error",
                    startBtnIcon: "media_stop",
                    startBtnText: "Stop",
                    isPauseVisible: true,
                    pauseBtnIcon: "media_pause",
                    pauseBtnText: "Pause"
                })
                break;
            case StopWatchStateOptions.PAUSED:
                setControls({
                    startBtnCls: "cui-error",
                    startBtnIcon: "media_stop",
                    startBtnText: "Stop",
                    isPauseVisible: true,
                    pauseBtnIcon: "media_play",
                    pauseBtnText: "Resume"
                })
                break;
            case StopWatchStateOptions.STOPPED:
                setControls({
                    startBtnCls: "cui-accent",
                    startBtnIcon: "media_play",
                    startBtnText: "Start",
                    isPauseVisible: false,
                    pauseBtnIcon: "media_pause",
                    pauseBtnText: "Pause"
                })
                break;
        }
    }

    React.useEffect(() => {
        updatePlayStateControls(props.playState);
        return () => { }
    }, [props.playState])

    return (<div className="training-control-btns">
        <a className="cui-icon-button cui-default cui-margin-small" cui-icon={props.soundIcon} onClick={props.onMute}></a>
        { controls.isPauseVisible && <IconButton icon={controls.pauseBtnIcon} onClick={props.onPauseResume} modifiers="cui-margin-small cui-large cui-default" />}
        <IconButton icon={controls.startBtnIcon} onClick={props.onStartStop} modifiers={"cui-large cui-fill " + controls.startBtnCls} />
        <a className="cui-icon-button cui-default cui-margin-small" cui-icon={props.fullscreenIcon} onClick={props.onFullScreen}></a>
    </div >);
}
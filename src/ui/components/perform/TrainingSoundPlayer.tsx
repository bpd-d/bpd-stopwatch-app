import * as React from 'react'
import { createArray } from '../../../core/helpers';

export interface TrainingSoundPlayerProps {
    children?: JSX.Element | JSX.Element[];
}

export function TrainingSoundPlayer(props: TrainingSoundPlayerProps) {
    const countdownSound = React.useRef(null);
    const exerciseSound = React.useRef(null);
    const warmupSound = React.useRef(null);
    const breakSound = React.useRef(null);
    const cooldownSound = React.useRef(null);
    const endSound = React.useRef(null);

    function playSound(type: string) {
        let element = undefined;
        switch (type) {
            case "countdown":
                element = countdownSound.current;
                break;
            case "end":
                element = endSound.current;
                break;
            case "exercise":
                element = exerciseSound.current;
                break;
            case "warmup":
                element = warmupSound.current;
                break;
            case "break":
                element = breakSound.current;
                break;
            case "cooldown":
                element = cooldownSound.current;
                break;

        }
        if (element) {
            element.currentTime = 0;
            element.play();
        }
    }

    return (<>
        {
            props.children && createArray(props.children).map(child => {
                return React.cloneElement(child, { playSound: playSound, ...child.props })
            })
        }
        <audio ref={countdownSound} id="stopwatch-countdown" src="/static/audio/stopwatch_countdown.mp3" />
        <audio ref={exerciseSound} id="stopwatch-exercise" src="/static/audio/stopwatch_exercise.mp3" />
        <audio ref={warmupSound} id="stopwatch-warmup" src="/static/audio/stopwatch_warmup.mp3" />
        <audio ref={breakSound} id="stopwatch-break" src="/static/audio/stopwatch_break.mp3" />
        <audio ref={cooldownSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_cooldown.mp3" />
        <audio ref={endSound} id="stopwatch-cooldown" src="/static/audio/stopwatch_end.mp3" />
    </>);
}


export interface TrainingSoundPlayerItemProps {
    playSound?: (value: string) => void;
}
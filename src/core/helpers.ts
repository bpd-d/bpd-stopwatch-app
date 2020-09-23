import { is } from "../../node_modules/bpd-toolkit/dist/esm/index";
import { StopwatchAction } from "./models";

export function showMessage(title: string, message: string) {
    window.$cui.alert("common-info-dialog", "Info", {
        title: title,
        message: message
    })
}

export function calculateDuration(actions: StopwatchAction[]) {
    return is(actions) ? actions.reduce<number>((result: number, value: StopwatchAction) => {
        return result + value.duration;
    }, 0) : 0
}

export function calcDisplayTimer(seconds: number): string {
    if (seconds < 0) {
        return "Error"
    }
    if (seconds < 60) {
        return "00:" + getDisplayTimerValue(seconds)
    } else if (seconds < 3600) {
        let minutes = Math.floor(seconds / 60);
        let restSeconds = seconds % 60;
        return getDisplayTimerValue(minutes) + ":" + getDisplayTimerValue(restSeconds);
    } else {
        let hours = Math.floor(seconds / 3600);
        let secondsLeft = seconds % 3600
        return getDisplayTimerValue(hours) + ":" + calcDisplayTimer(secondsLeft);
    }
}

export function getDisplayTimerValue(value: number): string {
    if (value < 0 || value > 59) {
        return "Error";
    }
    return value < 10 ? "0" + value : "" + value;
}

export function setDarkMode(darkMode: boolean) {
    if (window.$cui) {
        let utils = window.$cui.getUtils();
        utils.setLightMode(darkMode ? "dark" : "light");
    }
}
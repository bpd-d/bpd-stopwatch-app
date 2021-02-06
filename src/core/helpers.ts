import { is } from "bpd-toolkit/dist/esm/index";
import { PUSH_ACTIONS } from "../app/push/push";
import { ActionsGroup, Round, RoundActions, StopwatchAction, Training } from "./models";
import { APP_NAME } from "./statics";

export function showMessage(title: string, message: string) {
    window.$cui.alert("common-info-dialog", "Info", {
        title: title,
        message: message
    })
}

export function showToast(message: string) {
    window.$cui.toast(message);
}

export function calculateDuration(actions: StopwatchAction[]) {
    return is(actions) ? actions.reduce<number>((result: number, value: StopwatchAction) => {
        return result + Number.parseInt(value.duration);
    }, 0) : 0
}

export function calcDisplayTimer(seconds: number): string {
    if (seconds < 0) {
        return "Error"
    }
    return getFormattedDuration(seconds, (value: number, type: string) => {
        switch (type) {
            case "hour":
                return getDisplayTimerValue(value) + ":";
            case "minute":
                return getDisplayTimerValue(value) + ":";
            default:
                return getDisplayTimerValue(value);
        }
    })
}

export function getUserDisplayNotation(seconds: number) {
    return getFormattedDuration(seconds, (value: number, type: string) => {
        switch (type) {
            case "hour":
                return `${value}h`
            case "minute":
                return `${value}m`
            default:
                return `${value}s`
        }
    })
}

export function getSimplifiedDuration(seconds: number, format: (value: number, type: string) => string): string {

    if (seconds < 60) {
        return format(seconds, "second");
    } else if (seconds < 3600) {
        let minutes = Math.floor(seconds / 60);
        let restSeconds = seconds % 60;
        return format(minutes, 'minute') + getSimplifiedDuration(restSeconds, format);
    } else {
        let hours = Math.floor(seconds / 3600);
        let secondsLeft = seconds % 3600;
        return format(hours, 'hour') + getSimplifiedDuration(secondsLeft, format);
    }

}

export function getFormattedDuration(seconds: number, format: (value: number, type: string) => string): string {
    if (seconds < 3600) {
        let minutes = Math.floor(seconds / 60);
        let restSeconds = seconds % 60;
        return format(minutes, 'minute') + format(restSeconds, 'second');
    } else {
        let hours = Math.floor(seconds / 3600);
        let secondsLeft = seconds % 3600;
        return format(hours, 'hour') + getFormattedDuration(secondsLeft, format);
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

export function calculateProgress(current: number, max: number) {
    return Math.floor((current * 100) / max);
}

/**
 * Calculates total actions count and total duration of the training
 * @param training 
 * @returns total actions count and total duration
 */
export function getTotalDuration(training: Training) {
    return training.rounds.reduce<[number, number]>((result: [number, number], current: Round) => {
        return [result[0] + current.actions.length, result[1] + calculateDuration(current.actions)];
    }, [0, 0]);
}

export function getBgClassByType(type: string) {
    return "action-background-" + type;
}

export function getTextClassByActionType(type: string) {
    switch (type) {
        case 'warmup':
            return "cui-text-success";
        case 'break':
            return "cui-text-error";
        case 'exercise':
            return "cui-text-accent";
        case 'cooldown':
            return "cui-text-secondar";
        default:
            return "";
    }
}

/**
 * Inserts new item to the collection at specific index. If index is lower than 0 then item is added at position 0, if index is bigger than collection size then item is added at the end
 * @param collection Collection of items
 * @param index position which new item should be added to - if undefined or null provided item will be inserted at last position
 * @param t new items to add
 * @returns Copy of the collection with new item inserted at specific position
 */
export function insert<T>(collection: T[], index: number, ...t: T[]): T[] {
    if (!collection || collection === null || !t || t === null || t.length === 0) {
        return collection;
    }
    let length = collection.length;
    // If not provided then add then treat it like last
    if (!index || index === 0 || index >= length) {
        return [...collection, ...t];
    }
    if (index <= 0) {
        return [...t, ...collection];
    }
    collection.splice(index, 0, ...t);
    return [...collection]
}

export function move<T>(collection: T[], from: number, to: number, size?: number): T[] {
    if (!collection || collection === null || from < 0) {
        return collection;
    }
    let amount = size ?? 1;
    let length = collection.length;
    if (length < 2 || from >= length) {
        return [...collection];
    }
    const el = collection.splice(from, amount);
    const newLength = length - amount;
    const newTo = to;
    //let newIdx = newTo < 0 ? 0 : newTo > length - amount ? length - amount : newTo;
    if (newTo <= 0) {
        return [...el, ...collection];
    }
    if (newTo >= newLength) {
        return [...collection, ...el];
    }
    collection.splice(newTo, 0, ...el)
    return [...collection];

}

export function groupActionsByType(actions: StopwatchAction[]): ActionsGroup {
    return actions.reduce<ActionsGroup>((out: ActionsGroup, item: StopwatchAction) => {
        const type = item.type ?? "Unknown";
        if (!out[type]) {
            out[type] = [item];
        } else {
            out[type].push(item);
        }
        return out;
    }, {})
}

export function buildQuickRoundActions(actions: RoundActions, exerciseCount: number): StopwatchAction[] {
    const stopwatchActions: StopwatchAction[] = [];
    if (actions.warmup) {
        stopwatchActions.push(actions.warmup);
    }
    if (actions.exercise) {
        for (let i = 0; i < exerciseCount; i++) {
            stopwatchActions.push(actions.exercise);
            if (actions.break && i < exerciseCount - 1) {
                stopwatchActions.push(actions.break);
            }
        }
    }
    if (actions.cooldown) {
        stopwatchActions.push(actions.cooldown)
    }
    return stopwatchActions;
}

export function setPageTitle(text: string): void {
    if (is(text)) {
        document.title = `${APP_NAME} - ${text}`;
        return;
    }
    document.title = APP_NAME;
}

export function setNavbarTitle(text: string): void {
    window.$push.perform(PUSH_ACTIONS.SET_NAVBAR_TITLE, text);
}

export function createArray<T>(t: T | T[] | undefined): T[] {
    if (!t) {
        return []
    }
    if (Array.isArray(t)) {
        return t;
    }
    return [t];
}
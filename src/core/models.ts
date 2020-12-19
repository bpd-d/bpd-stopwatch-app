export const StopwatchActionType = {
    EXERCISE: 'exercise',
    BREAK: 'break',
    COOLDOWN: "cooldown",
    WARMUP: "warmup"
}

export const TrainingState = {
    DRAFT: 'draft',
    PUBLISH: 'publish',
    NEW: "new",
}

export interface Settings {
    darkMode: boolean;
    soundEnabled: boolean;
    isWelcome: boolean;
    simpleView: boolean;
}

export interface StopwatchAction {
    id: string;
    name: string;
    duration: string;
    type?: string;
    color?: string;
    removable?: boolean;
    editable?: boolean;
}

export interface Round {
    actions: StopwatchAction[];
    break?: number;
    name?: string;
}

export interface Training {
    name: string;
    description?: string;
    id?: string;
    rounds: Round[];
    state: string;
}

export class Exercise implements StopwatchAction {
    id: string;
    name: string;
    duration: string;
    type: string = StopwatchActionType.EXERCISE;
    removable: false;
    constructor(duration: number, name?: string) {
        this.id = "00001";
        this.duration = "" + duration;
        this.name = name ? name : 'Exercise';
    }
}

export class WarmUp implements StopwatchAction {
    id: string;
    name: string;
    duration: string;
    type: string = StopwatchActionType.WARMUP;
    removable: boolean = false;

    constructor(duration: number) {
        this.id = "00002";
        this.duration = "" + duration;
        this.name = "Warm Up"
    }
}

export class CoolDown implements StopwatchAction {
    id: string;
    name: string;
    duration: string;
    type: string = StopwatchActionType.COOLDOWN;
    removable: false;
    constructor(duration: number, name?: string) {
        this.id = "00003";
        this.duration = "" + duration;
        this.name = name ? name : "Cooldown";
    }
}
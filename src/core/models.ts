export const StopwatchActionType = {
    EXERCISE: 'exercise',
    BREAK: 'break',
    COOLDOWN: "cooldown",
    WARMUP: "warmup"
}

export interface Settings {
    darkMode: boolean;
    soundEnabled: boolean;
}

export interface StopwatchAction {
    name: string;
    duration: number;
    type?: string;
    color?: string;
    removable?: boolean;
    editable?: boolean;
}

export interface Round {
    actions: StopwatchAction[];
    break?: number;
    
}

export interface Training {
    name: string;
    description?: string;
    id?: number;
    rounds: Round[];
}

export class Exercise implements StopwatchAction {
    name: string;
    duration: number;
    type: string = StopwatchActionType.EXERCISE;
    removable: false;
    constructor(duration: number, name?: string) {
        this.duration = duration;
        this.name = name ? name : 'Exercise';
    }
}

export class WarmUp implements StopwatchAction {
    name: string;
    duration: number;
    type: string = StopwatchActionType.WARMUP;
    removable: boolean = false;

    constructor(duration: number) {
        this.duration = duration;
        this.name = "Warm Up"
    }
}

export class CoolDown implements StopwatchAction {
    name: string;
    duration: number;
    type: string = StopwatchActionType.COOLDOWN;
    removable: false;
    constructor(duration: number, name?: string) {
        this.duration = duration;
        this.name = name ? name : "Cooldown";
    }
}
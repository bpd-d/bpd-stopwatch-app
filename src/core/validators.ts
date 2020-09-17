import { is } from "../../node_modules/cui-light/dist/index";
import { Round, StopwatchAction, Training } from "./models";
import { ERROR_CODES } from "./statics";

export interface ValidationResult {
    status: boolean;
    errors?: string[];
}

export interface IValidator<T> {
    validate(t: T): ValidationResult
}

export abstract class ValidatorBase<T> implements IValidator<T> {
    validate(t: T): ValidationResult {
        const result: ValidationResult = { status: true }
        try {
            let errors = this.performValidation(t);
            if (errors && errors.length > 0) {
                result.status = false;
                result.errors = errors;
            }
        } catch (e) {
            console.error("An error occured during validation")
            console.error(e)
            result.status = false;
            result.errors = ["Error during validation: " + e.message]
        }
        return result;
    }

    protected abstract performValidation(t: T): string[];
}

export class TrainingValidator extends ValidatorBase<Training> {
    constructor() {
        super();
    }

    protected performValidation(t: Training): string[] {
        if (isNotObject(t)) {
            return ([ERROR_CODES.e0100]);
        }
        let errors = []
        if (isEmptyString(t.name)) {
            errors.push(ERROR_CODES.e0101)
        }
        if (isEmptyArray(t.rounds)) {
            errors.push(ERROR_CODES.e0102)
        }
        return errors;
    }

}


export class RoundValidator extends ValidatorBase<Round> {
    constructor() {
        super();
    }

    protected performValidation(t: Round): string[] {
        if (isNotObject(t)) {
            return ([ERROR_CODES.e0200]);
        }
        if (isEmptyArray(t.actions))
            return [ERROR_CODES.e0201]
    }
}

export class ActionValidator extends ValidatorBase<StopwatchAction> {
    constructor() {
        super();
    }

    protected performValidation(t: StopwatchAction): string[] {
        if (isNotObject(t)) {
            return ([ERROR_CODES.e0300]);
        }
        let errors = []
        if (isEmptyString(t.name)) {
            errors.push(ERROR_CODES.e0301)
        }
        if (isEmptyString(t.type)) {
            errors.push(ERROR_CODES.e0302)
        }
        if (t.duration < 0) {
            errors.push(ERROR_CODES.e0303)
        }
        return errors;
    }
}

function isEmptyArray<T>(t: T[]) {
    return isNotObject(t) || t.length === 0;
}

function isNotObject<T>(t: T) {
    return !t || t === null;
}

function isEmptyString(t: string) {
    return isNotObject(t) || t === "";
}